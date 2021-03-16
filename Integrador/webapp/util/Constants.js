sap.ui.define([], function(){
    "use strict";
    return {
        model:{
            I18N: "i18n",
        },

        properties: {

        },

        ids: {
            FRAGMENTS: {
                dialogProductos: "idDialogProductos",
                dialogMensaje: "idDialogUsuario",
            }
        },

        routes: {
            main: "Main",
            JSON: {
                productos: "Productos.json",
                mensaje: "Mensaje.json"
            },
            FRAGMENTS: {
                dialogProductos: "Integrador.Integrador.fragments.Table",
                dialogMensaje: "Integrador.Integrador.fragments.Table2",
            }
        },

        formatter: {
            DATE: "dd/MM/yyy",
            }
    };
}, true);