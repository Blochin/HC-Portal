import Repository from "./Repository";
import api from "../utils/api";

export const ALL = 9999;
export const INIT = 25;
class CryptogramRepository extends Repository {
  constructor() {
    super();
    this.loadedAll = false;
    this.loadedMyAll = false;
    this.cryptograms = [];
    this.myCryptograms = [];
  }
  getAll(count, onLoading, onSuccess, onError) {
    onLoading(true);
    let perPage = count >= ALL ? "" : `&per_page=${count}`;
    if (this.cryptograms.length < count && !this.loadedAll) {
      api
        .get(`api/cryptograms?detailed=1${perPage}`)
        .then((response) => {
          const data = response?.data?.data?.data;
          if (data) {
            this.cryptograms = data;
            if (count >= ALL) {
              this.loadedAll = true;
            }
            onLoading(false);
            onSuccess(this.cryptograms);
          }
        })
        .catch((error) => {
          onError(error);
        });
    } else {
      onLoading(false);
      onSuccess(this.cryptograms);
    }
  }

  getMy(count, onLoading, onSuccess, onError) {
    onLoading(true);
    let perPage = count >= ALL ? "" : `&per_page=${count}`;
    if (this.myCryptograms.length < count && !this.loadedMyAll) {
      onLoading(true);
      api
        .get(`api/cryptograms/my?detailed=1${perPage}`)
        .then((response) => {
          const data = response?.data?.data?.data;
          if (data) {
            this.myCryptograms = data;
            if (count >= ALL) {
              this.loadedMyAll = true;
            }
            onLoading(false);
            onSuccess(this.myCryptograms);
          }
        })
        .catch((error) => {
          onError(error);
        });
    } else {
      onLoading(false);
      onSuccess(this.myCryptograms);
    }
  }

  get(id, onLoading, onSuccess, onError) {
    onLoading(true);
    const cryptogram =
      this.myCryptograms.find((cryptogram) => cryptogram.id === parseInt(id)) ||
      this.cryptograms.find((cryptogram) => cryptogram.id === parseInt(id));
    if (cryptogram) {
      onLoading(false);
      onSuccess(cryptogram);
    } else {
      api
        .get(`api/cryptograms/${id}`)
        .then((response) => {
          const data = response?.data?.data;
          if (data) {
            // todo check if created_by is sent only if belong to owner
            if (!data.created_by) {
              this.cryptograms.concat(data);
            } else {
              this.myCryptograms.concat(data);
            }
            onLoading(false);
            onSuccess(data);
          } else {
            onError("Cryptogram not found");
          }
        })
        .catch((error) => {
          onError(error);
        });
    }
  }
  set() {
    super.set();
  }
  edit() {
    super.edit();
  }
}

export default CryptogramRepository;
