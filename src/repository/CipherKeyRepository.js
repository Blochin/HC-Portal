import Repository, { ALL } from "./Repository";
import api from "../utils/api";

class CipherKeyRepository extends Repository {
  constructor() {
    super();
    this.loadedAll = false;
    this.loadedMyAll = false;
    this.cipherKeys = [];
    this.myCipherKeys = [];
  }
  getAll(count, onLoading, onSuccess, onError) {
    onLoading(true);
    let perPage = count >= ALL ? "" : `&per_page=${count}`;
    if (this.cipherKeys.length < count && !this.loadedAll) {
      api
        .get(`api/cipher-keys?detailed=1${perPage}`)
        .then((response) => {
          this.cipherKeys = response?.data?.data?.data;
          if (count >= ALL) {
            this.loadedAll = true;
          }
        })
        .then(() => {
          onSuccess(this.cipherKeys);
        })
        .catch((error) => {
          onError(error);
        })
        .finally(() => {
          onLoading(false);
        });
    } else {
      onLoading(false);
      onSuccess(this.cipherKeys);
    }
  }

  getMy(count, onLoading, onSuccess, onError) {
    onLoading(true);
    let perPage = count >= ALL ? "" : `&per_page=${count}`;
    if (this.myCipherKeys.length < count && !this.loadedMyAll) {
      onLoading(true);
      api
        .get(`api/cipher-keys/my?detailed=1${perPage}`)
        .then((response) => {
          this.myCipherKeys = response?.data?.data?.data;
          if (count >= ALL) {
            this.loadedMyAll = true;
          }
        })
        .then(() => {
          onSuccess(this.myCipherKeys);
        })
        .catch((error) => {
          onError(error);
        })
        .finally(() => {
          onLoading(false);
        });
    } else {
      onLoading(false);
      onSuccess(this.myCipherKeys);
    }
  }

  get(id, onLoading, onSuccess, onError) {
    onLoading(true);
    const cipherKey =
      this.myCipherKeys.find((cipherKey) => cipherKey.id === parseInt(id)) ||
      this.cipherKeys.find((cipherKey) => cipherKey.id === parseInt(id));
    if (cipherKey) {
      onLoading(false);
      onSuccess(cipherKey);
    } else {
      api
        .get(`api/cipher-keys/${id}`)
        .then((response) => {
          const data = response?.data?.data;
          if (!data.created_by) {
            this.cipherKeys = this.cipherKeys.concat(data);
          } else {
            this.myCipherKeys = this.myCipherKeys.concat(data);
          }
          return data;
        })
        .then((data) => {
          onSuccess(data);
        })
        .catch((error) => {
          onError(error);
        })
        .finally(() => {
          onLoading(false);
        });
    }
  }
  set(data, onLoading, onSuccess, onError) {
    onLoading(true);
    api
      .post("api/cipher-keys", data)
      .then((response) => {
        this.myCipherKeys = this.myCipherKeys.concat(data);
        return response;
      })
      .then((response) => {
        onSuccess(response.data.data, response.data.message);
      })
      .catch((error) => {
        console.log(error);
        onError(error?.response?.data?.data, error?.response?.data?.message);
      })
      .finally(() => {
        onLoading(false);
      });
  }
  edit(id, data, onLoading, onSuccess, onError) {
    onLoading(true);
    api
      .post(`api/cipher-keys/${id}`, data)
      .then((response) => {
        this.myCipherKeys = this.myCipherKeys.filter(
          (cipherKey) => cipherKey.id !== parseInt(id),
        );
        this.myCipherKeys = this.myCipherKeys.concat(data);
        return response;
      })
      .then((response) => {
        onSuccess(response.data.data, response.data.message);
      })
      .catch((error) => {
        if (error.response) {
          onError(error?.response?.data?.data, error?.response?.data?.message);
        }
      })
      .finally(() => {
        onLoading(false);
      });
  }
}

export default CipherKeyRepository;
