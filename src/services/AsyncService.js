export default class AsyncService {

    static fetch(url, components, config) {
        return new Promise((resolve, reject) => {
            this.disableComponents(components);
            fetch(url, config).then(response => {
                this.enableComponents(components);
                resolve(response);
            }).catch(error => {
                this.enableComponents(components);
                reject(error);
            });
        });
    }

    static get(service, components) {
        return new Promise((resolve, reject) => {
            this.disableComponents(components);
            fetch(`${process.env.REACT_APP_URL_BACKEND}${service}`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json' }
            }).then(response => {
                this.enableComponents(components);
                resolve(response);
            }).catch(error => {
                this.enableComponents(components);
                reject(error);
            });
        });
    }

    static post(service, requestObj, components) {
        return new Promise((resolve, reject) => {
            this.disableComponents(components);
            fetch(`${process.env.REACT_APP_URL_BACKEND}${service}`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(requestObj)
            }).then(response => {
                this.enableComponents(components);
                resolve(response);
            }).catch(error => {
                this.enableComponents(components);
                reject(error);
            });
        });
    }

    static disableComponents(components) {
        if (components) {
            components.forEach(component => {
                if (component) {
                    component.setAttribute("disabled", "disabled");
                }
            });
        }
    }

    static enableComponents(components) {
        if (components) {
            components.forEach(component => {
                if (component) {
                    component.removeAttribute("disabled", "disabled");
                }
            });
        }
    }

}