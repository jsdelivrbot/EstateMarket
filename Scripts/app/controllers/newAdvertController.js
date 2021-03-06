﻿app.controller("NewAdvertController", [
    '$scope', '$q', '$window', '$http', '$modal', '$fileUploader',
    function ($scope, $q, $window, $http, $modal, $fileUploader) {
        $scope.step = 1;
        $scope.stepCount = 2;
        $scope.errors = {};
        $scope.warnings = {};
        $scope.publishButtonLabel = "Добавить";

        $scope.closeDialog = function() {
            delete $scope.realtyType;
            delete $scope.advertType;
            delete $scope.cost;
            delete $scope.step;
            $scope.uploader.queue = [];
        };

        $scope.isLastStep = function() {
            return $scope.step == $scope.stepCount;
        };

        $scope.isFirstStep = function () {
            return $scope.step == 1;
        };

        $scope.next = function () {
            $scope["validateStep" + $scope.step]();

            if (hasFields($scope.errors))
                return;

            $scope.step += 1;
        };

        $scope.validateStep1 = function () {
            $scope.errors = {};
            $scope.warnings = {};

            if (!$scope.realtyType || $scope.realtyType == "")
                $scope.errors["shouldSelectRealtyType"] = "Тип недвижимости должен быть указан";

            if (!$scope.advertType || $scope.advertType == "")
                $scope.errors["shouldSelectAdvertType"] = "Тип объявления должен быть указан";

            switch ($scope.realtyType) {
                case "house":
                    if (!$scope.objectType || $scope.objectType == "")
                        $scope.errors["shouldInputObjectType"] = "Укажите тип объекта";
                    break;

                case "garage":
                    if (!$scope.objectType || $scope.objectType == "")
                        $scope.errors["shouldInputObjectType"] = "Укажите вид объекта";
                    break;

                case "commercial":
                    if (!$scope.objectType || $scope.objectType == "")
                        $scope.errors["shouldInputObjectType"] = "Укажите вид объекта";

                    break;

                default:
            }

            if (!$scope.cost || $scope.cost == "")
                $scope.errors["shouldInputCost"] = "Укажите стоимость недвижимости";

            if (!$scope.contactPhone || $scope.contactPhone == "")
                $scope.errors["shouldInputContactPhone"] = "Телефон должен быть указан";

        };

        $scope.back = function () {
            $scope.step -= 1;
        };

        $scope.isNotRoomOrApartments = function () {
            return $scope.realtyType != "room" && $scope.realtyType != "apartment";
        };

        $scope.isRoomOrApartments = function () {
            return !$scope.isNotRoomOrApartments();
        };

        $scope.isNotHousesOrLands = function () {
            return $scope.realtyType != "house" && $scope.realtyType != "land";
        };

        $scope.isHousesOrLands = function () {
            return !$scope.isNotHousesOrLands();
        };

        $scope.showPhotoStepTitle = function() {
            return uploader.isHTML5 && uploader.queue.length == 0;
        };

        var uploader = $scope.uploader = $fileUploader.create({
            scope: $scope,
            //url: $http.prefix + "api/images"
        });

        uploader.filters.push(function (item) {
            var type = uploader.isHTML5 ? item.type : '/' + item.value.slice(item.value.lastIndexOf('.') + 1);
            type = '|' + type.toLowerCase().slice(type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        });


        $scope.emptyRealtyType = "Неуказано";
        $scope.emptyAdvertType = "Неуказано";
        $scope.emptyObjectType = "Неуказано";
        $scope.emptyGarageType = "Неуказано";
        $scope.emptySecurity = "Неуказано";

        function hasFields(obj) {
            var count = 0;
            for (var prop in obj) {
                count++;
            }
            return count > 0;
        };

        var phones = [
            { "mask": "+#(###) ###-##-##" },
           //{ "mask": "##-##-##" },
        ];

        $scope.phoneRegex = {
            mask: phones,
            definitions: {
                '#': {
                    validator: "[0-9]",
                    cardinality: 1
                }
            }
        };

        $scope.integerOptions = {
            autoGroup: true,
            groupSeparator: ",",
            groupSize: 3,
            rightAlign: false
        };

    }
]);