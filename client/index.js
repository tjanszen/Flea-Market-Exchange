'use strict';

angular.module('angular-notes', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {url:'/', templateUrl:'/views/general/home.html'})
      .state('faq', {url:'/faq', templateUrl:'/views/general/faq.html'})
      .state('contact', {url:'/contact', templateUrl:'/views/general/contact.html'})

      .state('register', {url:'/register', templateUrl:'/views/users/users.html', controller:'UsersCtrl'})
      .state('login', {url:'/login', templateUrl:'/views/users/users.html', controller:'UsersCtrl'})

      .state('notes', {url:'/notes', templateUrl:'/views/notes/notes.html', abstract:true})
      .state('notes.new', {url:'/new', templateUrl:'/views/notes/notes_new.html', controller:'NotesCtrl'})
      .state('notes.list', {url:'?tag', templateUrl:'/views/notes/notes_list.html', controller:'NotesCtrl'})
      .state('notes.show', {url:'/{noteId}', templateUrl:'/views/notes/notes_show.html', controller:'NotesCtrl'});
  }])
  .run(['$rootScope', 'User', function($rootScope, User){
    User.status().then(function(response){
      $rootScope.email = response.data.email;
    });
  }]);
