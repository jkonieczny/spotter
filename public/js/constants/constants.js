var constants = {
    AUTH: {
        AUTHO: {
            GET: 'AUTHO_GET',
            LOCK: 'AUTHO_LOCK',
            SHOW: 'AUTHO_SHOW'
        },
        SPOTTER: {
            GET: 'SPOTTER_TRAINER_GET'
        }
    },
    CLIENT: {
        ADD: 'CLIENT_ADD',
        DELETE: 'CLIENT_DELETE',
        SET: 'CLIENT_SET',
        IMAGE: {
            ADD: 'CLIENT_IMAGE_ADD',
            UPLOADED: 'CLIENT_IMAGE_UPLOADED'
        },
        UPDATE: 'CLIENT_UPDATE'
    },
    CLIENTS: {
        GET: 'CLIENTS_GET'
    },
    EMAIL: {
        SEND: 'EMAIL_SEND'
    },
    TRAINER: {
        UPDATE: 'TRAINER_UPDATE'
    },
    PRODUCTS: {
        GET: 'PRODUCTS_GET',
        ADD: 'PRODUCTS_ADD',
        REMOVE: 'PRODUCTS_REMOVE',
        RESET: 'PRODUCTS_RESET',
        SEARCH: 'PRODUCTS_SEARCH'
    },
    PAGE: {
        GOBACK: 'PAGE_BACK',
        UPDATE: 'PAGE_UPDATE'
    }
};

module.exports = constants;
