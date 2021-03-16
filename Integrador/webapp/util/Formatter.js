jQuery.sap.require("sap.ui.core.format.DateFormat");
sap.ui.define([

    "Integrador/Integrador/util/Constants",

], function(Constants) {
    'use strict';
    return{

       formatDate: function (sDate) {

            if (!sDate) {

                return;

            }

            var date = new Date(sDate);

            var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({

                // pattern: "dd/MM/yyyy"

                pattern: Constants.formatterDate.DATE

            });

            return dateFormat.format(date);

        },

        formatPeso: function(nPeso){

            if(!nPeso){
                return;
            } else{
                nPeso = parseFloat(nPeso);
                if(nPeso < 1){
                    return "Success"
                } else if (nPeso >= 1 && nPeso <= 2){
                    return "Warning"
                } else {
                    return "Error";
                }
            }
        },

        formatValor: function(valor){
            let total = parseFloat(valor)/160;
            return total;
        }

}}, true);