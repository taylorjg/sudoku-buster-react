import EventEmitter from "events"
import { DataObject } from "./dataObject"
import { ColumnObject } from "./columnObject"

export type MatrixValue = any
export type MatrixRow = MatrixValue[]
export type Matrix = MatrixRow[]

export type Solution = number[]
export type PartialSolution = number[]

export type Options = {
  numSolutions?: number
  numPrimaryColumns?: number
}

export function solve(matrix: Matrix, options: Options) {
  return new Dlx().solve(matrix, options)
}

export function* solutionGenerator(matrix: Matrix, options: Options): Generator<Solution> {
  yield* new Dlx().solutionGenerator(matrix, options)
}

export class Dlx extends EventEmitter {

  public constructor() {
    super()
  }

  public solve(matrix: Matrix, options?: Options): Solution[] {
    this.checkOptions(options)
    const numSolutions = options?.numSolutions ?? Number.MAX_SAFE_INTEGER
    const solutions = []
    const iterator = this.solutionGenerator(matrix, options)
    for (let index = 0; index < numSolutions; index++) {
      const iteratorResult = iterator.next()
      if (iteratorResult.done) break
      solutions.push(iteratorResult.value)
    }
    return solutions
  }

  public * solutionGenerator(matrix: Matrix, options?: Options): Generator<Solution> {
    this.checkOptions(options)
    const root = buildInternalStructure(matrix, options)
    const searchState = new SearchState(this, root)
    yield* search(searchState)
  }

  private checkOptions = (options?: Options): void => {
    if (options?.numSolutions !== undefined) {
      if (!Number.isInteger(options.numSolutions)) {
        throw new Error("options.numSolutions must be an integer")
      }
      if (options.numSolutions < 0) {
        throw new Error("options.numSolutions can't be negative - don't be silly")
      }
    }

    if (options?.numPrimaryColumns !== undefined) {
      if (!Number.isInteger(options.numPrimaryColumns)) {
        throw new Error("options.numPrimaryColumns must be an integer")
      }
      if (options.numPrimaryColumns < 0) {
        throw new Error("options.numPrimaryColumns can't be negative - don't be silly")
      }
    }
  }
}

const buildInternalStructure = (matrix: Matrix, options?: Options) => {

  const numPrimaryColumns = options?.numPrimaryColumns ?? matrix[0].length

  const root = new ColumnObject()
  const colIndexToListHeader = new Map()

  matrix.forEach((row: MatrixRow, rowIndex: number) => {
    let firstDataObjectInThisRow: DataObject | undefined = undefined
    row.forEach((col, colIndex: number) => {
      if (rowIndex === 0) {
        const listHeader = new ColumnObject()
        if (colIndex < numPrimaryColumns) {
          root.appendColumnHeader(listHeader)
        }
        colIndexToListHeader.set(colIndex, listHeader)
      }
      if (col) {
        const listHeader = colIndexToListHeader.get(colIndex)
        const dataObject = new DataObject(listHeader, rowIndex)
        if (firstDataObjectInThisRow)
          firstDataObjectInThisRow.appendToRow(dataObject)
        else
          firstDataObjectInThisRow = dataObject
      }
    })
  })

  return root
}

function* search(searchState: SearchState): Generator<Solution> {

  searchState.raiseSearchStepEvent()

  if (searchState.isEmpty()) {
    if (searchState.currentSolution.length) {
      searchState.raiseSolutionFoundEvent()
      yield searchState.currentSolution.slice()
    }
    return
  }

  const c = chooseColumnWithFewestRows(searchState)
  coverColumn(c)
  for (let r = c.down; r !== c; r = r.down) {
    searchState.pushRowIndex(r.rowIndex!)
    r.loopRight(j => coverColumn(j.listHeader!))
    yield* search(searchState)
    r.loopLeft(j => uncoverColumn(j.listHeader!))
    searchState.popRowIndex()
  }
  uncoverColumn(c)
}

const chooseColumnWithFewestRows = (searchState: SearchState) => {
  let chosenColumn: ColumnObject | undefined = undefined
  searchState.root.loopNext(column => {
    if (!chosenColumn || column.numberOfRows < chosenColumn.numberOfRows) {
      chosenColumn = column
    }
  })
  return chosenColumn!
}

const coverColumn = (c: ColumnObject) => {
  c.unlinkColumnHeader()
  c.loopDown(i => i.loopRight(j => j.listHeader!.unlinkDataObject(j)))
}

const uncoverColumn = (c: ColumnObject) => {
  c.loopUp(i => i.loopLeft(j => j.listHeader!.relinkDataObject(j)))
  c.relinkColumnHeader()
}

class SearchState {

  public currentSolution: number[] = []
  private stepIndex: number = 0
  private solutionIndex: number = 0

  public constructor(private dlx: Dlx, public root: ColumnObject) {
  }

  public isEmpty() {
    return this.root.nextColumnObject === this.root
  }

  public pushRowIndex(rowIndex: number) {
    this.currentSolution.push(rowIndex)
  }

  public popRowIndex() {
    this.currentSolution.pop()
  }

  public raiseSearchStepEvent() {
    if (this.currentSolution.length) {
      const partialSolution: PartialSolution = this.currentSolution.slice()
      const e = {
        partialSolution,
        stepIndex: this.stepIndex++
      }
      this.dlx.emit("step", e)
    }
  }

  public raiseSolutionFoundEvent() {
    const solution: Solution = this.currentSolution.slice()
    const e = {
      solution,
      solutionIndex: this.solutionIndex++
    }
    this.dlx.emit("solution", e)
  }
}