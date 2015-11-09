angular.module("app",["ngRoute"]),angular.module("app").directive("moDateInput",["$window",function(e){return{require:"^ngModel",restrict:"A",link:function(o,t,a,n){var r=e.moment,l=a.moMediumDate;a.$observe("moDateInput",function(e){l!=e&&n.$modelValue&&(l=e,n.$modelValue=new Date(n.$setViewValue))}),n.$formatters.unshift(function(e){if(o=o,!l||!e)return"";var t=r(e).format(l);return t}),n.$parsers.unshift(function(e){o=o;var t=r(e,l);return t&&t.isValid()&&t.year()>1950?t.toDate():""})}}}]),angular.module("app").directive("moChangeProxy",["$parse",function(e){return console.log("Inside moChangeProxy"),{require:"^ngModel",restrict:"A",link:function(o,t,a,n){var r=a.moChangeProxy,l=a.ngModel;o.$watch(r,function(t){t!=n.$modelValue&&e(l).assign(o,t)}),t.bind("blur",function(){var t=o.$eval(r);n.$modelValue!=t&&o.$apply(function(){e(r).assign(o,n.$modelValue)})})}}}]),angular.module("app").controller("DogsCtrl",["$scope","DogsSvc",function(e,o){o.fetch().success(function(o){console.log("Total Number of dogs is: "+o.length),e.dogs=o})}]),angular.module("app").controller("CreateCtrl",["$window","$scope","DogCreationSvc",function(e,o,t){o.addDog=function(){console.log("Just adding a dog"),console.log("$scope.dogStartDate"+o.dogStartDate),o.dogName&&t.create({dogName:o.dogName,ownerFirstName:o.ownerFirstName,ownerLastName:o.ownerSurname,dogDOB:o.dogDOB,dogStartDate:o.dogStartDate,dogPicture:o.image}).success(function(o){e.location.href="/#/"})}}]),angular.module("app").controller("UploadCtrl",["$scope",function(e){e.image=""}]).directive("myUpload",[function(){return{restrict:"A",link:function(e,o,t){var a=new FileReader;a.onload=function(o){e.image=o.target.result,e.$apply()},o.on("change",function(){a.readAsDataURL(o[0].files[0])})}}}]),angular.module("app").controller("EditCtrl",["$location","$scope","DogsGetOneSvc",function(e,o,t){var a=!1,n=e.search();t.fetch(n.dogName).success(function(e){o.dog=e}),o.addNewWalk=function(){a=!0;var e=o.dog.walks.walkArray.length,t=new Date;o.dog.walks.walkArray.push({walkDate:t,walkTime:"60"}),console.log("adding a new walk, now have: "+(e+1))},o.removeWalk=function(e){console.log("Going to remove walk from list at position: "+e),o.dog.walks.walkArray.splice(e,1)},o.hasUpdatedWalk=function(){return a}}]),angular.module("app").controller("DeleteCtrl",["$location","$scope","DogsDeleteSvc",function(e,o,t){var a=e.search();t["delete"](a.dogId).success(function(e){o.dog=e})}]),angular.module("app").controller("UpdateCtrl",["$location","$scope","DogsUpdateSvc",function(e,o,t){console.log("About to update Dog: ")}]),angular.module("app").service("DogsSvc",["$http",function(e){this.fetch=function(){return e.get("/api/dogs")}}]),angular.module("app").service("DogCreationSvc",["$http",function(e){this.create=function(o){return e.post("/api/dog",o)}}]),angular.module("app").service("DogsGetOneSvc",["$http",function(e){this.fetch=function(o){return console.log("Inside the angular service layer.  Have been asked to get dog: "+o),e({url:"/api/dog",method:"GET",params:{dogNameParam:o}})}}]),angular.module("app").service("DogsDeleteSvc",["$http",function(e){this["delete"]=function(o){return console.log("Inside the angular service layer.  Have been asked to delete dog: "+o),e({url:"/api/dog",method:"DELETE",params:{dogIdParam:o}})}}]),angular.module("app").service("DogsUpdateSvc",["$http",function(e){console.log("Inside the angular service layer.  Have been asked to update dog ")}]),angular.module("app").config(["$routeProvider",function(e){e.when("/",{controller:"DogsCtrl",templateUrl:"dogList.html"}).when("/createDog",{controller:"CreateCtrl",templateUrl:"dogCreation.html"}).when("/editDog",{controller:"EditCtrl",templateUrl:"dogEdit.html"}).when("/deleteDog",{controller:"DeleteCtrl",templateUrl:"dogList.html"}).when("/updateDog",{controller:"UpdateCtrl",templateUrl:"dogList.html"})}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsImRvZ3MuY3RybC5qcyIsImRvZ3Muc3ZjLmpzIiwicm91dGVzLmpzIl0sIm5hbWVzIjpbImFuZ3VsYXIiLCJtb2R1bGUiLCJkaXJlY3RpdmUiLCIkd2luZG93IiwicmVxdWlyZSIsInJlc3RyaWN0IiwibGluayIsInNjb3BlIiwiZWxtIiwiYXR0cnMiLCJjdHJsIiwibW9tZW50IiwiZGF0ZUZvcm1hdCIsIm1vTWVkaXVtRGF0ZSIsIiRvYnNlcnZlIiwibmV3VmFsdWUiLCIkbW9kZWxWYWx1ZSIsIkRhdGUiLCIkc2V0Vmlld1ZhbHVlIiwiJGZvcm1hdHRlcnMiLCJ1bnNoaWZ0IiwibW9kZWxWYWx1ZSIsInJldFZhbCIsImZvcm1hdCIsIiRwYXJzZXJzIiwidmlld1ZhbHVlIiwiZGF0ZSIsImlzVmFsaWQiLCJ5ZWFyIiwidG9EYXRlIiwiJHBhcnNlIiwiY29uc29sZSIsImxvZyIsInByb3h5RXhwIiwibW9DaGFuZ2VQcm94eSIsIm1vZGVsRXhwIiwibmdNb2RlbCIsIiR3YXRjaCIsIm5WYWwiLCJhc3NpZ24iLCJiaW5kIiwicHJveHlWYWwiLCIkZXZhbCIsIiRhcHBseSIsImNvbnRyb2xsZXIiLCIkc2NvcGUiLCJEb2dzU3ZjIiwiZmV0Y2giLCJzdWNjZXNzIiwiZG9ncyIsImxlbmd0aCIsIkRvZ0NyZWF0aW9uU3ZjIiwiYWRkRG9nIiwiZG9nU3RhcnREYXRlIiwiZG9nTmFtZSIsImNyZWF0ZSIsIm93bmVyRmlyc3ROYW1lIiwib3duZXJMYXN0TmFtZSIsIm93bmVyU3VybmFtZSIsImRvZ0RPQiIsImRvZ1BpY3R1cmUiLCJpbWFnZSIsImRvZyIsImxvY2F0aW9uIiwiaHJlZiIsImVsZW0iLCJyZWFkZXIiLCJGaWxlUmVhZGVyIiwib25sb2FkIiwiZSIsInRhcmdldCIsInJlc3VsdCIsIm9uIiwicmVhZEFzRGF0YVVSTCIsImZpbGVzIiwiJGxvY2F0aW9uIiwiRG9nc0dldE9uZVN2YyIsImhhc05ld1dhbGsiLCJzZWFyY2hPYmplY3QiLCJzZWFyY2giLCJhZGROZXdXYWxrIiwiY3VycmVudFdhbGtDb3VudCIsIndhbGtzIiwid2Fsa0FycmF5IiwidG9kYXkiLCJwdXNoIiwid2Fsa0RhdGUiLCJ3YWxrVGltZSIsInJlbW92ZVdhbGsiLCJpbmRleCIsInNwbGljZSIsImhhc1VwZGF0ZWRXYWxrIiwiRG9nc0RlbGV0ZVN2YyIsImRvZ0lkIiwiRG9nc1VwZGF0ZVN2YyIsInNlcnZpY2UiLCIkaHR0cCIsInRoaXMiLCJnZXQiLCJwb3N0IiwidXJsIiwibWV0aG9kIiwicGFyYW1zIiwiZG9nTmFtZVBhcmFtIiwiZG9nSWRQYXJhbSIsImNvbmZpZyIsIiRyb3V0ZVByb3ZpZGVyIiwid2hlbiIsInRlbXBsYXRlVXJsIl0sIm1hcHBpbmdzIjoiQUFBQUEsUUFBQUMsT0FBQSxPQUNBLFlDUUFELFFBQUFDLE9BQUEsT0FBQUMsVUFBQSxlQUFBLFVBQUEsU0FBQUMsR0FFQSxPQUNBQyxRQUFBLFdBQ0FDLFNBQUEsSUFDQUMsS0FBQSxTQUFBQyxFQUFBQyxFQUFBQyxFQUFBQyxHQUVBLEdBQUFDLEdBQUFSLEVBQUFRLE9BQ0FDLEVBQUFILEVBQUFJLFlBQ0FKLEdBQUFLLFNBQUEsY0FBQSxTQUFBQyxHQUNBSCxHQUFBRyxHQUFBTCxFQUFBTSxjQUNBSixFQUFBRyxFQUNBTCxFQUFBTSxZQUFBLEdBQUFDLE1BQUFQLEVBQUFRLGtCQUdBUixFQUFBUyxZQUFBQyxRQUFBLFNBQUFDLEdBR0EsR0FEQWQsRUFBQUEsR0FDQUssSUFBQVMsRUFBQSxNQUFBLEVBQ0EsSUFBQUMsR0FBQVgsRUFBQVUsR0FBQUUsT0FBQVgsRUFDQSxPQUFBVSxLQUdBWixFQUFBYyxTQUFBSixRQUFBLFNBQUFLLEdBRUFsQixFQUFBQSxDQUNBLElBQUFtQixHQUFBZixFQUFBYyxFQUFBYixFQUNBLE9BQUFjLElBQUFBLEVBQUFDLFdBQUFELEVBQUFFLE9BQUEsS0FBQUYsRUFBQUcsU0FBQSxVQU9BN0IsUUFBQUMsT0FBQSxPQUFBQyxVQUFBLGlCQUFBLFNBQUEsU0FBQTRCLEdBR0EsTUFG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LE9BQUE4RixRQUFBLFdBQUEsUUFBQSxTQUFBQyxHQUNBQyxLQUFBbEQsTUFBQSxXQUNBLE1BQUFpRCxHQUFBRSxJQUFBLGlCQU9BbEcsUUFBQUMsT0FBQSxPQUFBOEYsUUFBQSxrQkFBQSxRQUFBLFNBQUFDLEdBRUFDLEtBQUExQyxPQUFBLFNBQUFPLEdBQ0EsTUFBQWtDLEdBQUFHLEtBQUEsV0FBQXJDLE9BTUE5RCxRQUFBQyxPQUFBLE9BQUE4RixRQUFBLGlCQUFBLFFBQUEsU0FBQUMsR0FDQUMsS0FBQWxELE1BQUEsU0FBQU8sR0FJQSxNQUZBdkIsU0FBQUMsSUFBQSxrRUFBQXNCLEdBRUEwQyxHQUNBSSxJQUFBLFdBQ0FDLE9BQUEsTUFDQUMsUUFBQUMsYUFBQWpELFNBT0F0RCxRQUFBQyxPQUFBLE9BQUE4RixRQUFBLGlCQUFBLFFBQUEsU0FBQUMsR0FFQUMsS0FBQUEsVUFBQSxTQUFBSixHQUlBLE1BRkE5RCxTQUFBQyxJQUFBLHFFQUFBNkQsR0FFQUcsR0FDQUksSUFBQSxXQUNBQyxPQUFBLFNBQ0FDLFFBQUFFLFdBQUFYLFNBUUE3RixRQUFBQyxPQUFBLE9BQUE4RixRQUFBLGlCQUFBLFFBQUEsU0FBQUMsR0FJQWpFLFFBQUFDLElBQUEsd0VDekRBaEMsUUFBQUMsT0FBQSxPQUNBd0csUUFBQSxpQkFBQSxTQUFBQyxHQUNBQSxFQUNBQyxLQUFBLEtBQUEvRCxXQUFBLFdBQUFnRSxZQUFBLGlCQUNBRCxLQUFBLGNBQUEvRCxXQUFBLGFBQUFnRSxZQUFBLHFCQUNBRCxLQUFBLFlBQUEvRCxXQUFBLFdBQUFnRSxZQUFBLGlCQUNBRCxLQUFBLGNBQUEvRCxXQUFBLGFBQUFnRSxZQUFBLGlCQUNBRCxLQUFBLGNBQUEvRCxXQUFBLGFBQUFnRSxZQUFBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbXG4nbmdSb3V0ZSdcbl0pXG5cbiIsIi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vQW5ndWxhciBDb250cm9sbGVyIGZpbGUuICBcbi8vQ2FsbGVkIGJ5IHRoZSBIVE1MIHBhZ2UgdGhhdCBjb250YWlucyBBbmd1bGFyIHRhZ3Ncbi8vQ2FsbHMgdG8gZG9ncy5zdmMuanNcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG4vL05leHQgMiBcImRpcmVjdGl2ZXNcIiBhcmUgYW4gYXR0ZW1wdCB0byBnZXQgZGF0ZSBmb3JtYXR0aW5nIHRvIHdvcmtcblxuYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmRpcmVjdGl2ZSgnbW9EYXRlSW5wdXQnLCBmdW5jdGlvbiAoJHdpbmRvdykge1xuXHRcbiAgICByZXR1cm4ge1xuICAgICAgICByZXF1aXJlOidebmdNb2RlbCcsXG4gICAgICAgIHJlc3RyaWN0OidBJyxcbiAgICAgICAgbGluazpmdW5jdGlvbiAoc2NvcGUsIGVsbSwgYXR0cnMsIGN0cmwpIHtcbiAgICAgICAgXHRcbiAgICAgICAgICAgIHZhciBtb21lbnQgPSAkd2luZG93Lm1vbWVudDtcbiAgICAgICAgICAgIHZhciBkYXRlRm9ybWF0ID0gYXR0cnMubW9NZWRpdW1EYXRlO1xuICAgICAgICAgICAgYXR0cnMuJG9ic2VydmUoJ21vRGF0ZUlucHV0JywgZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGVGb3JtYXQgPT0gbmV3VmFsdWUgfHwgIWN0cmwuJG1vZGVsVmFsdWUpIHJldHVybjtcbiAgICAgICAgICAgICAgICBkYXRlRm9ybWF0ID0gbmV3VmFsdWU7XG4gICAgICAgICAgICAgICAgY3RybC4kbW9kZWxWYWx1ZSA9IG5ldyBEYXRlKGN0cmwuJHNldFZpZXdWYWx1ZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY3RybC4kZm9ybWF0dGVycy51bnNoaWZ0KGZ1bmN0aW9uIChtb2RlbFZhbHVlKSB7XG4gICAgICAgICAgICBcdFxuICAgICAgICAgICAgICAgIHNjb3BlID0gc2NvcGU7XG4gICAgICAgICAgICAgICAgaWYgKCFkYXRlRm9ybWF0IHx8ICFtb2RlbFZhbHVlKSByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgICAgICB2YXIgcmV0VmFsID0gbW9tZW50KG1vZGVsVmFsdWUpLmZvcm1hdChkYXRlRm9ybWF0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0VmFsO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGN0cmwuJHBhcnNlcnMudW5zaGlmdChmdW5jdGlvbiAodmlld1ZhbHVlKSB7XG4gICAgICAgICAgICBcdDtcbiAgICAgICAgICAgICAgICBzY29wZSA9IHNjb3BlO1xuICAgICAgICAgICAgICAgIHZhciBkYXRlID0gbW9tZW50KHZpZXdWYWx1ZSwgZGF0ZUZvcm1hdCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChkYXRlICYmIGRhdGUuaXNWYWxpZCgpICYmIGRhdGUueWVhcigpID4gMTk1MCApID8gZGF0ZS50b0RhdGUoKSA6IFwiXCI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG59KTtcblxuXG5hbmd1bGFyLm1vZHVsZSgnYXBwJykuZGlyZWN0aXZlKCdtb0NoYW5nZVByb3h5JywgZnVuY3Rpb24gKCRwYXJzZSkge1xuXHRjb25zb2xlLmxvZygnSW5zaWRlIG1vQ2hhbmdlUHJveHknKTtcblx0XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVxdWlyZTonXm5nTW9kZWwnLFxuICAgICAgICByZXN0cmljdDonQScsXG4gICAgICAgIGxpbms6ZnVuY3Rpb24gKHNjb3BlLCBlbG0sIGF0dHJzLCBjdHJsKSB7XG4gICAgICAgICAgICB2YXIgcHJveHlFeHAgPSBhdHRycy5tb0NoYW5nZVByb3h5O1xuICAgICAgICAgICAgdmFyIG1vZGVsRXhwID0gYXR0cnMubmdNb2RlbDtcbiAgICAgICAgICAgIHNjb3BlLiR3YXRjaChwcm94eUV4cCwgZnVuY3Rpb24gKG5WYWwpIHtcbiAgICAgICAgICAgICAgICBpZiAoblZhbCAhPSBjdHJsLiRtb2RlbFZhbHVlKVxuICAgICAgICAgICAgICAgICAgICAkcGFyc2UobW9kZWxFeHApLmFzc2lnbihzY29wZSwgblZhbCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGVsbS5iaW5kKCdibHVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBwcm94eVZhbCA9IHNjb3BlLiRldmFsKHByb3h5RXhwKTtcbiAgICAgICAgICAgICAgICBpZihjdHJsLiRtb2RlbFZhbHVlICE9IHByb3h5VmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLiRhcHBseShmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgJHBhcnNlKHByb3h5RXhwKS5hc3NpZ24oc2NvcGUsIGN0cmwuJG1vZGVsVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG59KTtcblxuXG4vL0xvYWQgdGhlIGRvZyBsaXN0IG9udG8gdGhlIHNjcmVlbiBhZnRlciBwdWxsaW5nIGJhY2sgZnJvbSBzZXJ2aWNlLiBcbi8vSW1hZ2UgaXMgcHVsbGVkIGJhY2sgd2l0aGluIHRoZSBKU09OLCBub3RoaW5nIHNwZWNpYWwgaGFzIHRvIGJlIGRvbmVcbmFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCdEb2dzQ3RybCcsIGZ1bmN0aW9uICgkc2NvcGUsIERvZ3NTdmMpIHtcbiAgIFxuXHREb2dzU3ZjLmZldGNoKCkuc3VjY2VzcyhmdW5jdGlvbiAoZG9ncykge1xuXHRcdFxuXHRcdGNvbnNvbGUubG9nKCdUb3RhbCBOdW1iZXIgb2YgZG9ncyBpczogJyArIGRvZ3MubGVuZ3RoKTtcblx0XHRcdFxuXHRcdCAgJHNjb3BlLmRvZ3MgPSBkb2dzXG5cdFx0fSlcblx0IFxufSlcblxuIFxuLy9BbGwgY3JlYXRpb24gb2YgZG9ncyBmcm9tIGRhdGEgZW50cnkgb24gdGhlIHNjcmVlblxuLy9UaGUgbmctY2xpY2sgY2FsbHMgdGhlIGFkZERvZyBmdW5jdGlvblxuLy9Ob3RlIEkgYWRkZWQgdGhlICR3aW5kb3cgcGFyYW1ldGVyIHRvIGFsbG93IGZsaWNrIGJhY2sgdG8gbGlzdCBhZnRlciBjcmVhdGlvblxuXG5hbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignQ3JlYXRlQ3RybCcsIGZ1bmN0aW9uICgkd2luZG93LCAkc2NvcGUsIERvZ0NyZWF0aW9uU3ZjKSB7XG4gICBcblx0JHNjb3BlLmFkZERvZyA9IGZ1bmN0aW9uKCl7XG5cdFx0XG5cdFx0Y29uc29sZS5sb2coJ0p1c3QgYWRkaW5nIGEgZG9nJyk7XG5cdFx0Ly9jb25zb2xlLmxvZygnJHNjb3BlLmltYWdlID0gJyArICRzY29wZS5pbWFnZSk7XG5cdFx0Y29uc29sZS5sb2coJyRzY29wZS5kb2dTdGFydERhdGUnICsgJHNjb3BlLmRvZ1N0YXJ0RGF0ZSk7XG5cdFx0Ly9UaGUgYWJvdmUgbGluZSBjb25maXJtcyB0aGF0IHRoZSBpbWFnZSByZWFkIGluIHVwbG9hZCBpcyBhbHNvIHZpc2libGUgd2hlbiBhIGNvbWUgdG8gXG5cdFx0Ly9zdWJtaXQgdGhlIGVudGlyZSBkb2cgcGFnZS4gID09PiBOb3cgbmVlZCB0byBnZXQgaW1hZ2VzIGFjcm9zcyB0byB0aGUgTm9kZSBzZXJ2aWNlIGFuZCB0aGVuIHNhdmVkIGluIE1vbmdvISFcblx0XHRcblx0XHRpZigkc2NvcGUuZG9nTmFtZSl7ICAgLy9DcmVhdGUgdGhlIEpTT04gb2JqZWN0IHRvIHNlbmQgdG8gdGhlIHNlcnZpY2UgY2FsbFxuXHRcdFx0RG9nQ3JlYXRpb25TdmMuY3JlYXRlKHtcblx0XHRcdFx0ZG9nTmFtZTogJHNjb3BlLmRvZ05hbWUsIFxuXHRcdFx0XHRvd25lckZpcnN0TmFtZTogJHNjb3BlLm93bmVyRmlyc3ROYW1lLCBcblx0XHRcdFx0b3duZXJMYXN0TmFtZTogJHNjb3BlLm93bmVyU3VybmFtZSwgXG5cdFx0XHRcdGRvZ0RPQjokc2NvcGUuZG9nRE9CLFxuXHRcdFx0XHRkb2dTdGFydERhdGU6JHNjb3BlLmRvZ1N0YXJ0RGF0ZSxcblx0XHRcdFx0ZG9nUGljdHVyZTokc2NvcGUuaW1hZ2Vcblx0XHRcdH0pXG5cdFx0XHQuc3VjY2VzcyhmdW5jdGlvbiAoZG9nKXtcblx0XHRcdFx0JHdpbmRvdy5sb2NhdGlvbi5ocmVmPScvIy8nICBcblx0XHRcdFx0Ly9KTCBhZGRlZCB0aGlzIGhyZWYgdG8gdGFrZSB0aGUgdXNlciBiYWNrIHRvIGxpc3QgcGFnZS4gIE1heSBiZSBhIGJldHRlciB3YXkgb2YgZG9pbmcgdGhpcy5cblx0XHRcdFx0Ly9Tb2x1dGlvbiBpcyBoZXJlOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzI3OTQxODc2L2hvdy10by1yZWRpcmVjdC10by1hbm90aGVyLXBhZ2UtdXNpbmctYW5ndWxhci1qc1xuXHRcdFx0fSlcblx0XHR9XG5cdH1cbn0pXHRcblxuLy9BZGRlZCB0aGlzIGNvbnRyb2xsZXIgdG8gYWxsb3cgdXNlciB0byBwaWNrIGEgZmlsZSBmb3IgdGhlaXIgZG9nLlxuLy9Db2RlIHRha2VuIGZyb20gaGVyZTogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xOTk4NjE3OC9kaXNwbGF5aW5nLWFuLWltYWdlLWFmdGVyLXVwbG9hZGluZy1pbi1hbmd1bGFyLWpzXG5hbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignVXBsb2FkQ3RybCcsIFsnJHNjb3BlJywgZnVuY3Rpb24gKCRzY29wZSkge1xuICAgICAgICAgICAgJHNjb3BlLmltYWdlID0gXCJcIjtcbiAgICAgICAgfV0pLmRpcmVjdGl2ZSgnbXlVcGxvYWQnLCBbZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uICgkc2NvcGUsIGVsZW0sIGF0dHJzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICAgICAgICAgICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5pbWFnZSA9IGUudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vT24gY2hhbmdlIG9mICdzdGF0ZScsIHJlYWQgYSBuZXcgZmlsZVxuICAgICAgICAgICAgICAgICAgICBlbGVtLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGVsZW1bMF0uZmlsZXNbMF0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XSk7XG5cblxuXG4vL0NvbnRyb2xsZXIgdG8gdGFrZSB0aGUgc2VsZWN0ZWQgZG9nIGFuZCBzaG93IGFuIGVkaXQgcGFnZSBmb3IgdGhhdCBkb2dcbmFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCdFZGl0Q3RybCcsIGZ1bmN0aW9uICgkbG9jYXRpb24sICRzY29wZSwgRG9nc0dldE9uZVN2Yykge1xuIFxuXHQvL1RPIERPIC0gaXMgdGhpcyB2YXJpYWJsZSB0aHJlYWQgc2FmZT8/P1xuXHR2YXIgaGFzTmV3V2FsayA9IGZhbHNlO1xuXHRcblx0Ly9HZXQgdGhlIGRvZyBuYW1lIGZyb20gdGhlIHF1ZXJ5IHN0cmluZyAtIFRPRE8gLSBtYWtlIHRoaXMgdGhlIGRvZyB1bmlxdWUgSUQgSW4gZnV0dXJlLlxuXHR2YXIgc2VhcmNoT2JqZWN0ID0gJGxvY2F0aW9uLnNlYXJjaCgpO1xuXHRcblx0Ly9TZWFyY2ggZGF0YWJhc2UgZm9yIGRvZyB3aXRoIHRoaXMgbmFtZVxuXHQvL1Nob3cgZG9nIGRldGFpbHMgb24gdGhlIHNjcmVlblxuXHRcblx0RG9nc0dldE9uZVN2Yy5mZXRjaChzZWFyY2hPYmplY3QuZG9nTmFtZSkuc3VjY2VzcyhmdW5jdGlvbiAoZG9nKSB7XG5cdFx0ICAkc2NvcGUuZG9nID0gZG9nXG5cdFx0fSlcblx0XHRcblx0XHRcblx0Ly9BZGQgYSBuZXcgd2FsayBsaW5lIHRvIHRoZSB0YWJsZVxuXHQkc2NvcGUuYWRkTmV3V2FsayA9IGZ1bmN0aW9uKCkge1xuXHRcdFxuXHRcdGhhc05ld1dhbGsgPSB0cnVlO1xuXHRcdHZhciBjdXJyZW50V2Fsa0NvdW50ID0gJHNjb3BlLmRvZy53YWxrcy53YWxrQXJyYXkubGVuZ3RoO1xuXHRcdHZhciB0b2RheSA9IG5ldyBEYXRlKCk7XG5cdFx0XG5cdFx0JHNjb3BlLmRvZy53YWxrcy53YWxrQXJyYXkucHVzaCh7J3dhbGtEYXRlJzp0b2RheSwgJ3dhbGtUaW1lJzogJzYwJ30pO1xuXG5cdCAgICBjb25zb2xlLmxvZygnYWRkaW5nIGEgbmV3IHdhbGssIG5vdyBoYXZlOiAnICsgKGN1cnJlbnRXYWxrQ291bnQrMSkpO1xuXG5cdCAgICBcblx0ICB9O1xuXHQgIFxuXHQvL1JlbW92ZSBhIHdhbGsgbGluZSBmcm9tIHRoZSB0YWJsZVxuXHQkc2NvcGUucmVtb3ZlV2FsayA9IGZ1bmN0aW9uKGluZGV4KSB7XG5cdFx0XG5cdCAgICBjb25zb2xlLmxvZygnR29pbmcgdG8gcmVtb3ZlIHdhbGsgZnJvbSBsaXN0IGF0IHBvc2l0aW9uOiAnICsgaW5kZXgpO1xuXHRcdFxuXHRcdCRzY29wZS5kb2cud2Fsa3Mud2Fsa0FycmF5LnNwbGljZShpbmRleCwgMSk7XG5cdFx0XG5cdCAgfTtcblx0ICBcblx0ICBcblx0Ly9UTyBETyAtIG5lZWQgYSB3YXkgdG8gZGV0ZXJtaW5lIGlmIGFueSBvZiB0aGUgd2FsayBzdGF0ZSBoYXMgY2hhbmdlZCwgYW5kIHJldHVybiB0cnVlIG9ubHkgaWYgaXQgaGFzLlxuXHQkc2NvcGUuaGFzVXBkYXRlZFdhbGsgPSBmdW5jdGlvbigpIHtcblx0ICAgICAgICAgcmV0dXJuIGhhc05ld1dhbGs7ICBcblx0ICAgIH07ICBcbn0pXG4gXG4vL0NvbnRyb2xsZXIgdG8gZGVsZXRlIHRoZSBzZWxlY3RlZCBkb2cgZnJvbSB0aGUgZGF0YWJhc2VcbmFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCdEZWxldGVDdHJsJywgZnVuY3Rpb24gKCRsb2NhdGlvbiwgJHNjb3BlLCBEb2dzRGVsZXRlU3ZjKSB7XG4gXG5cdC8vR2V0IHRoZSBkb2cgSUQgZnJvbSB0aGUgcXVlcnkgc3RyaW5nXG5cdHZhciBzZWFyY2hPYmplY3QgPSAkbG9jYXRpb24uc2VhcmNoKCk7XG5cdFxuXHQvL1JlbW92ZSB0aGUgZG9nIGZyb20gdGhlIGRhdGFiYXNlXG5cdERvZ3NEZWxldGVTdmMuZGVsZXRlKHNlYXJjaE9iamVjdC5kb2dJZCkuc3VjY2VzcyhmdW5jdGlvbiAoZG9nKSB7XG5cdFx0ICAkc2NvcGUuZG9nID0gZG9nXG5cdFx0fSlcblx0XG59KVxuXG4vL0NvbnRyb2xsZXIgdG8gdXBkYXRlIHRoZSBzZWxlY3RlZCBkb2cgaW4gdGhlIGRhdGFiYXNlXG5hbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignVXBkYXRlQ3RybCcsIGZ1bmN0aW9uICgkbG9jYXRpb24sICRzY29wZSwgRG9nc1VwZGF0ZVN2Yykge1xuIFxuXHRjb25zb2xlLmxvZygnQWJvdXQgdG8gdXBkYXRlIERvZzogJyk7XG5cdFxufSlcblxuXG4iLCIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vL0FuZ3VsYXIgU2VydmljZXMgZmlsZS4gIFxuLy9DYWxsZWQgYnkgZG9nLmN0cmwuanMgZmlsZVxuLy9DYWxscyB0byBIVFRQIHNlcnZpY2UgaW4gZG9ncy5qcyAoSS5FIGEgUkVTVEZ1bCBIVFRQIGNhbGwgdG8gTm9kZSlcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuLy9HZXQgdGhlIGxpc3Qgb2YgZG9ncyB0byBzaG93IG9uIHRoZSBzY3JlZW5cblxuYW5ndWxhci5tb2R1bGUoJ2FwcCcpLnNlcnZpY2UoJ0RvZ3NTdmMnLCBmdW5jdGlvbiAoJGh0dHApIHtcbiAgdGhpcy5mZXRjaCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gJGh0dHAuZ2V0KCcvYXBpL2RvZ3MnKVxuICB9XG59KVxuXG5cblxuLy9TYXZlIGEgbmV3IGRvZyB0byB0aGUgSFRUUCBwb3N0IHNlcnZpY2VcbmFuZ3VsYXIubW9kdWxlKCdhcHAnKS5zZXJ2aWNlKCdEb2dDcmVhdGlvblN2YycsIGZ1bmN0aW9uICgkaHR0cCkge1xuXHRcbiAgdGhpcy5jcmVhdGUgPSBmdW5jdGlvbiAoZG9nKSB7XG4gICAgcmV0dXJuICRodHRwLnBvc3QoJy9hcGkvZG9nJywgZG9nKVxuICAgIH0gXG59KVxuXG5cbi8vR2V0IGEgc2luZ2xlIGRvZyBmcm9tIHRoZSBzdG9yZSBieSBuYW1lXG5hbmd1bGFyLm1vZHVsZSgnYXBwJykuc2VydmljZSgnRG9nc0dldE9uZVN2YycsIGZ1bmN0aW9uICgkaHR0cCkge1xuICB0aGlzLmZldGNoID0gZnVuY3Rpb24gKGRvZ05hbWUpIHtcblx0ICBcblx0Y29uc29sZS5sb2coJ0luc2lkZSB0aGUgYW5ndWxhciBzZXJ2aWNlIGxheWVyLiAgSGF2ZSBiZWVuIGFza2VkIHRvIGdldCBkb2c6ICcgKyBkb2dOYW1lKTsgXG5cdCBcblx0cmV0dXJuICRodHRwKHtcblx0XHR1cmw6ICcvYXBpL2RvZycsIFxuXHRcdG1ldGhvZDogXCJHRVRcIixcblx0XHRwYXJhbXM6e2RvZ05hbWVQYXJhbTpkb2dOYW1lfVxuXHR9KVxuICB9XG59KVxuXG5cbi8vRGVsZXRlIGEgc2luZ2xlIGRvZyBmcm9tIHRoZSBzdG9yZSBieSBJRFxuYW5ndWxhci5tb2R1bGUoJ2FwcCcpLnNlcnZpY2UoJ0RvZ3NEZWxldGVTdmMnLCBmdW5jdGlvbiAoJGh0dHApIHtcbiBcblx0dGhpcy5kZWxldGUgPSBmdW5jdGlvbiAoZG9nSWQpIHtcblx0ICBcblx0Y29uc29sZS5sb2coJ0luc2lkZSB0aGUgYW5ndWxhciBzZXJ2aWNlIGxheWVyLiAgSGF2ZSBiZWVuIGFza2VkIHRvIGRlbGV0ZSBkb2c6ICcgKyBkb2dJZCk7IFxuXHQgXG5cdHJldHVybiAkaHR0cCh7XG5cdFx0dXJsOiAnL2FwaS9kb2cnLCBcblx0XHRtZXRob2Q6IFwiREVMRVRFXCIsXG5cdFx0cGFyYW1zOntkb2dJZFBhcmFtOmRvZ0lkfVxuXHR9KVxuXHRcbiAgfVxufSlcblxuXG4vL0RlbGV0ZSBhIHNpbmdsZSBkb2cgZnJvbSB0aGUgc3RvcmUgYnkgSURcbmFuZ3VsYXIubW9kdWxlKCdhcHAnKS5zZXJ2aWNlKCdEb2dzVXBkYXRlU3ZjJywgZnVuY3Rpb24gKCRodHRwKSB7XG4gXG5cdFxuXHQgIFxuXHRjb25zb2xlLmxvZygnSW5zaWRlIHRoZSBhbmd1bGFyIHNlcnZpY2UgbGF5ZXIuICBIYXZlIGJlZW4gYXNrZWQgdG8gdXBkYXRlIGRvZyAnKTtcblx0IFxuXG59KSIsIi8vLy8vLy8vLy8vLy8vXG4vLyBEZXRlcm1pbmVzIHdoaWNoIEhUTUwgdG8gbG9hZCBkZXBlbmRpbmcgb24gd2hpY2ggbmF2aWdhdGlvbiBsaW5rIHRoZSB1c2VyIGhhcyBjbGlja2VkXG4vLyBMaW5rcyB0aGUgSFRNTCBwYWdlIHRvIHRoZSBBbmd1bGFyIGNvbnRyb2xsZXJcblxuXG5hbmd1bGFyLm1vZHVsZSgnYXBwJylcbi5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XG4gICRyb3V0ZVByb3ZpZGVyXG4gIC53aGVuKCcvJywgeyBjb250cm9sbGVyOiAnRG9nc0N0cmwnLCB0ZW1wbGF0ZVVybDogJ2RvZ0xpc3QuaHRtbCcgfSlcbiAgLndoZW4oJy9jcmVhdGVEb2cnLCB7IGNvbnRyb2xsZXI6ICdDcmVhdGVDdHJsJywgdGVtcGxhdGVVcmw6ICdkb2dDcmVhdGlvbi5odG1sJyB9KVxuICAud2hlbignL2VkaXREb2cnLCB7IGNvbnRyb2xsZXI6ICdFZGl0Q3RybCcsIHRlbXBsYXRlVXJsOiAnZG9nRWRpdC5odG1sJ30pXG4gICAud2hlbignL2RlbGV0ZURvZycsIHsgY29udHJvbGxlcjogJ0RlbGV0ZUN0cmwnLCB0ZW1wbGF0ZVVybDogJ2RvZ0xpc3QuaHRtbCd9KVxuICAgLndoZW4oJy91cGRhdGVEb2cnLCB7IGNvbnRyb2xsZXI6ICdVcGRhdGVDdHJsJywgdGVtcGxhdGVVcmw6ICdkb2dMaXN0Lmh0bWwnfSlcbn0pXG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==