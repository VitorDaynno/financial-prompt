type Operations = {
  [key: string]: () => Promise<void>;
}

export default Operations;