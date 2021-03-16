sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "Integrador/Integrador/util/Constants",
    "Integrador/Integrador/util/Formatter",
    "Integrador/Integrador/util/Services",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox",
	"sap/m/MessageToast"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller, JSONModel, Fragment, Constants, Formatter, Services, Filter, FilterOperator, MessageBox, MessageToast) {
		"use strict";

		return Controller.extend("Integrador.Integrador.controller.Main", {
            	
		onInit: function () {
                
            const oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            sap.ui.getCore().getConfiguration().setLanguage("ES");

            


            
            this.loadModelMensaje();

        },

            Formatter: Formatter,
            
            loadModel: async function() {
                const oResponseProducto = await Services.getLocalJSON(Constants.routes.JSON.productos);
                const oDataProducto = oResponseProducto[0];

                var oModelProducto = new JSONModel();
                oModelProducto.setData(oDataProducto);

                this.getView().setModel(oModelProducto, "productoJSON");
            },

            loadModelMensaje: function() {
                let oData = {fecha:null, proveedor:null, pais:null};

                var oModelMensaje = new JSONModel(oData);
  

                this.getView().setModel(oModelMensaje, "mensajeJSON");
            },

            // TableMensaje

            onOpenDialog: function () {

                this.loadModel();

                let oModelMensaje = this.getView().getModel("mensajeJSON");
                let fechaUser = oModelMensaje.getProperty("/fecha");
                let provUser = oModelMensaje.getProperty("/proveedor");
                let paisUser = oModelMensaje.getProperty("/pais");

			MessageBox.information("Fecha: " + fechaUser + " Proveedor: " + provUser + " Pais: " + paisUser);
		    },



            // onOpenDialog : function(){
            //     const oView = this.getView();

            //     if (!this._oFragment) {
            //         Fragment.load({
            //             id: oView.getId(),
            //             name: Constants.routes.FRAGMENTS.dialogMensaje,
            //             controller: this
            //         }).then(function (oDialog) {
            //             this._oFragment = oDialog;
            //             this.getView().addDependent(this._oFragment);
            //             this._oFragment.open();
            //     }.bind(this));
            //         return;
            //     }
            //     this._oFragment.open();
            // },
            // onCloseDialog : function(){
            //     this.byId(Constants.ids.FRAGMENTS.dialogMensaje).close();
            // },

            // TableProductos

            // onOpenDialog : function(){
            //     const oView = this.getView();

            //     if (!this._oFragment) {
            //         Fragment.load({
            //             id: oView.getId(),
            //             name: Constants.routes.FRAGMENTS.dialogProductos,
            //             controller: this
            //         }).then(function (oDialog) {
            //             this._oFragment = oDialog;
            //             this.getView().addDependent(this._oFragment);
            //             this._oFragment.open();
            //     }.bind(this));
            //         return;
            //     }
            //     this._oFragment.open();
            // },

            // onCloseDialog : function(){
            //     this.byId(Constants.ids.FRAGMENTS.dialogProductos).close();
            // },       
            
            onSearch: function(oEvent){

                var aFilters = [];
                var sQuery = oEvent.getSource().getValue();
                if (sQuery && sQuery.length > 0){

                    var oFilter = new Filter ("producto", FilterOperator.Contains, sQuery);
                    aFilters.push(oFilter);

                    var oFilter = new Filter ("proveedor", FilterOperator.Contains, sQuery);
                    aFilters.push(oFilter);

                    var oFilters = new Filter (aFilters);

                }

                var oTable = this.getView().byId("idTableProductos");
                var oBindingInfo = oTable.getBinding("items");
                oBindingInfo.filter(oFilters, "Application");

            },

	});
});