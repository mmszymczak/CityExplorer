(function() {
    'use strict';

    angular
        .module('project')
        .controller('LoginController', LoginController);

    function LoginController($scope) {
        var vm = this;

        vm.form = {};
        vm.submitForm = submitForm;
        vm.openAccess = false;

        function submitForm() {

            if($scope.formLog.$valid){
                vm.form.name = vm.name;
                vm.form.password = vm.password;
                vm.resultInfo = 'Welcome '+vm.form.name+', your password is '+vm.form.password;
                vm.openAccess = true;
            }

        }

    }

})();
