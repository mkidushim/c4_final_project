// var validationApp = angular.module('validationApp', []);
var formApp = angular.module('formApp', []);

// create angular controller
// validationApp.controller('mainController', function($scope) {

//     // function to submit the form after all validation has occurred            
//     $scope.submitForm = function(isValid) {

//         // check to make sure the form is completely valid
//         if (isValid) {
//             alert('our form is amazing');
//         }
//     };

// })


function formController($scope, $http) {
    $scope.formData = {};
    $scope.processForm = function() {
        $http({
                method: 'POST',
                url: 'validate.php',
                data: $.param($scope.formData), // pass in data as strings
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                } // set the headers so angular passing info as form data (not request payload)
            })
            .success(function(data) {
                console.log(data);

                if (!data.success) {
                    // if not successful, bind errors to error variables
                    $scope.errorName = data.errors.name;
                    $scope.errorSuperhero = data.errors.superheroAlias;
                } else {
                    // if successful, bind success message to message
                    $scope.message = data.message;
                }
            });
    }
}
