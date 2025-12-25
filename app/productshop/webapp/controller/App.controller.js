sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/core/Fragment",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, Filter,Fragment, FilterOperator, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("productshop.webapp.controller.App", {

        onFilter: function (oEvent) {
            var sQuery = oEvent.getParameter("query");
            var aFilter = [];
            if (sQuery) {
                aFilter.push(new Filter("category", FilterOperator.Contains, sQuery));
            }
            var oList = this.byId("productTable").getBinding("items");
            oList.filter(aFilter);
        },

        onCreate: function () {
            var oView = this.getView();

            if (!this._pDialog) {
                this._pDialog = Fragment.load({
                    id: oView.getId(),
                    name: "productshop.webapp.view.AddProductDialog",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._pDialog.then(function (oDialog) {
                oDialog.open();
            });
        },

        onCloseDialog: function () {
            this.byId("inputTitle").setValue("");
            this.byId("addDialog").close();
        },

        onSaveProduct: function () {
            var oListBinding = this.byId("productTable").getBinding("items");
            
            var sTitle = this.byId("inputTitle").getValue();
            var sCategory = this.byId("selectCategory").getSelectedKey();

            if (!sTitle) {
                MessageBox.error("The name is requiered");
                return;
            }

            var oContext = oListBinding.create({
                "name": sTitle,
                "category": sCategory,
            });

            var that = this;
            oContext.created().then(function () {
                MessageToast.show("The product has been created");
                that.onCloseDialog();
                that.byId("inputTitle").setValue("");
            }, function (oError) {
                MessageBox.error("Erreur : " + oError.message);
            });
        },

        onEdit: function (oEvent) {
            var oView = this.getView();
            var oContext = oEvent.getSource().getBindingContext();

            if (!this._pEditDialog) {
                this._pEditDialog = Fragment.load({
                    id: oView.getId(),
                    name: "productshop.webapp.view.EditProductDialog",
                    controller: this
                }).then(function (oDialog) {
            oView.addDependent(oDialog);
            return oDialog;
                });
            }

            this._pEditDialog.then(function (oDialog) {
            oDialog.setBindingContext(oContext); 
            oDialog.open();
            });
        },
        onSaveEdit: function () {
            var oContext = this.byId("editDialog").getBindingContext();
            var sTitle = oContext.getProperty("name");

            if (!sTitle || sTitle.trim() === "") {
                MessageBox.error("The name should not be empty");
                return; 
            }
            this.getView().getModel().submitBatch("updateGroup").then(function(){
            MessageToast.show("The product has been updated successfully");
            this.onCloseEditDialog();
            }.bind(this));
        },

        onCloseEditDialog: function () {
            this.getView().getModel().resetChanges("updateGroup");
            this.byId("editDialog").close();
        },


        onDelete: function (oEvent) {
            var oContext = oEvent.getSource().getBindingContext();
            oContext.delete().then(function () {
                MessageToast.show("Product has been deleted successfully");
            });
        },
        onPress: function (oEvent) {
            var oItem = oEvent.getSource();
            var oContext = oItem.getBindingContext();
            var sID = oContext.getProperty("ID");
            this.getOwnerComponent().getRouter().navTo("RouteDetail", {productId: sID});
        },

        onSave: function () {
            this.getView().getModel().submitBatch("updateGroup");
        }
    });
});
