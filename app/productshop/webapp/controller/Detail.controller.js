sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History" // <--- Ajoutez cette dépendance
], function (Controller, History) {
    "use strict";

    return Controller.extend("productshop.webapp.controller.Detail", {
        
        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("RouteDetail").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function (oEvent) {
            var sProductId = oEvent.getParameter("arguments").productId;
            this.getView().bindElement("/Products(" + sProductId + ")");
        },

        // LA FONCTION DE RETOUR
        onNavBack: function () {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                // Si on a un historique dans l'application, on fait un retour navigateur
                window.history.go(-1);
            } else {
                // Sinon (ex: si on a ouvert le lien direct), on force le retour à la vue principale
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteView", {}, true);
            }
        }
    });
});
