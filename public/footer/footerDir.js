angular.module('myApp')
.directive('footerDir', function() {
  return {
    templateUrl: './footer/footerDirTmpl.html',
    restrict: 'E'
  }
})
