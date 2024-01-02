import Repository from "./Repository";
import api from "../utils/api";

class CryptogramRepository extends Repository {
  constructor() {
    super();
    this.cryptograms = [];
    this.myCryptograms = [];
  }
  getAll(count, onLoading, onSuccess, onError) {
    let perPage = count >= 999 ? "" : `&per_page=${count}`;
    if (this.cryptograms.length < count) {
      onLoading(true);
      api
        .get(`api/cryptograms?detailed=1${perPage}`)
        .then((response) => {
          const data = response?.data?.data?.data;
          if (data) {
            this.cryptograms = data;
            onLoading(false);
            onSuccess(this.cryptograms);
          }
        })
        .catch((error) => {
          onError(error);
        });
    } else {
      onSuccess(this.cryptograms);
    }
  }

  getMy(count, onLoading, onSuccess, onError) {
    let perPage = count >= 999 ? "" : `&per_page=${count}`;
    if (this.myCryptograms.length < count) {
      onLoading(true);
      api
        .get(`api/cryptograms/my?detailed=1${perPage}`)
        .then((response) => {
          const data = response?.data?.data?.data;
          if (data) {
            this.myCryptograms = data;
            onLoading(false);
            onSuccess(this.myCryptograms);
          }
        })
        .catch((error) => {
          onError(error);
        });
    } else {
      onSuccess(this.myCryptograms);
    }
  }

  get() {
    super.get();
  }
  set() {
    super.set();
  }
  edit() {
    super.edit();
  }
}

export default CryptogramRepository;
