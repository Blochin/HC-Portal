import Repository from "./Repository";
import api from "../utils/api";

class CipherKeyRepository extends Repository {
  constructor() {
    super();
    this.cipherKeys = [];
    this.myCipherKeys = [];
  }
  getAll(count, onLoading, onSuccess, onError) {
    let perPage = count >= 999 ? "" : `&per_page=${count}`;
    if (this.cipherKeys.length < count) {
      onLoading(true);
      api
        .get(`api/cipher-keys?detailed=1${perPage}`)
        .then((response) => {
          const data = response?.data?.data?.data;
          if (data) {
            this.cipherKeys = data;
            onLoading(false);
            onSuccess(this.cipherKeys);
          }
        })
        .catch((error) => {
          onError(error);
        });
    } else {
      onSuccess(this.cipherKeys);
    }
  }

  getMy(count, onLoading, onSuccess, onError) {
    let perPage = count >= 999 ? "" : `&per_page=${count}`;
    if (this.myCipherKeys.length < count) {
      onLoading(true);
      api
        .get(`api/cipher-keys/my?detailed=1${perPage}`)
        .then((response) => {
          const data = response?.data?.data?.data;
          if (data) {
            this.myCipherKeys = data;
            onLoading(false);
            onSuccess(this.myCipherKeys);
          }
        })
        .catch((error) => {
          onError(error);
        });
    } else {
      onSuccess(this.myCipherKeys);
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

export default CipherKeyRepository;
