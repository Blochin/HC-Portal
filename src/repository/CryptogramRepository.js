import Repository, { ALL } from "./Repository";
import api from "../utils/api";

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
          this.cryptograms = response?.data?.data?.data;
          if (count >= ALL) {
            this.loadedAll = true;
          }
        })
        .then(() => {
          onSuccess(this.cryptograms);
        })
        .catch((error) => {
          onError(error);
        })
        .finally(() => {
          onLoading(false);
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
          this.myCryptograms = response?.data?.data?.data;
          if (count >= ALL) {
            this.loadedMyAll = true;
          }
        })
        .then(() => {
          onSuccess(this.myCryptograms);
        })
        .catch((error) => {
          onError(error);
        })
        .finally(() => {
          onLoading(false);
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
          if (!data.created_by) {
            this.cryptograms = this.cryptograms.concat(data);
          } else {
            this.myCryptograms = this.myCryptograms.concat(data);
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
      .post("api/cryptograms", data)
      .then((response) => {
        this.myCryptograms = this.myCryptograms.concat(response.data.data);
        return response;
      })
      .then((response) => {
        onSuccess(response.data.data, response.data.message);
      })
      .catch((error) => {
        onError(error?.response?.data?.errors, error?.response?.data?.message);
      })
      .finally(() => {
        onLoading(false);
      });
  }
  edit(id, data, onLoading, onSuccess, onError) {
    onLoading(true);
    api
      .post(`api/cryptograms/${id}`, data)
      .then((response) => {
        this.myCryptograms = this.myCryptograms.filter(
          (cryptogram) => cryptogram.id !== parseInt(id),
        );
        this.myCryptograms = this.myCryptograms.concat(response.data.data);
        return response;
      })
      .then((response) => {
        onSuccess(response.data.data, response.data.message);
      })
      .catch((error) => {
        if (error.response) {
          onError(
            error?.response?.data?.errors,
            error?.response?.data?.message,
          );
        }
      })
      .finally(() => {
        onLoading(false);
      });
  }
}

export default CryptogramRepository;
