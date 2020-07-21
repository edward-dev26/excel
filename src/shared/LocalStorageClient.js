import {storage, storageName} from '@core/utils';

export class LocalStorageClient {
    constructor(id) {
        this.name = storageName(id);
    }

    save(state) {
        storage(this.name, state);
        return Promise.resolve();
    }

    get() {
        return new Promise(resolve => {
            const state = storage(this.name);

            setTimeout(() => {
                resolve(state);
            }, 2000);
        });
    }
}