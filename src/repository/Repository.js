class Repository {
  getAll() {
    throw new Error("getAll method must be implemented in derived classes");
  }

  getMy() {
    throw new Error("getAll method must be implemented in derived classes");
  }

  get() {
    throw new Error("get method must be implemented in derived classes");
  }

  set() {
    throw new Error("get method must be implemented in derived classes");
  }

  edit() {
    throw new Error("edit method must be implemented in derived classes");
  }
}

export default Repository;
