angular.module('myApp')
.directive('headerDir', function() {
  return {
    templateUrl: 'header/headerDirTmpl.html',
    restrict: 'E'
  }
})
