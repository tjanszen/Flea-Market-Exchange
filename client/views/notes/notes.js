'use strict';

angular.module('angular-notes')
  .controller('NotesCtrl', ['$scope', '$state', 'Note', function($scope, $state, Note){
    if($state.current.name === 'notes.new'){
      $scope.temp = [];
      $scope.note = {urls:[]};
    }

    if($state.current.name === 'notes.show'){
      Note.show($state.params.noteId).then(function(response){
        $scope.note = response.data.note;
      });
    }

    if($state.current.name === 'notes.list'){
      $scope.tag = $state.params.tag;
      Note.all().then(function(response){
        $scope.notes = response.data.notes;
      });
    }

    $scope.tagFilter = function(note){
      if(!$scope.tag || !note.tags){return true;}
      return _.any(note.tags, function(t){return t === $scope.tag;});
    };

    $scope.add = function(){
      $scope.temp.push(null);
    };

    $scope.create = function(note){
      Note.create(note).then(function(){
        $state.go('notes.list');
      });
    };
  }]);
