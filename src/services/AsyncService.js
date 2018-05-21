
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

    static disableComponents(components) {
        if (components) {
            components.forEach(i => {
                i.setAttribute("disabled", "disabled");
            });
        }
    }

    static enableComponents(components) {
        if (components) {
            components.forEach(i => {
                i.removeAttribute("disabled", "disabled");
            });
        }
    }

}