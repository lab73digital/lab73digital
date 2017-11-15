$(document).ready(function () {

    displayTasksArray();
    displayDoneTasksArray();
    displayDeletedTasksArray();

    function addNewTask() {
        var newTaskText = $('<p class="task-item"></p>').text($('#newTask').val());
        $('.start-of_list').after(newTaskText);
    }

    // var taskCounter = +localStorage.getItem('taskCounteD') + 1;
    // function addNewTaskToLS() {
    //     var newTaskTextPost = $('#newTask').val();
    //     localStorage.setItem(taskCounter + '', newTaskTextPost);
    //     localStorage.setItem('taskCounteD', taskCounter);
    //     taskCounter++;
    // }
    //
    // var iMax = +localStorage.getItem('taskCounteD');
    // for (var i=1; i<=iMax; i++) {
    //     var loadedTask = localStorage.getItem(i+'');
    //     var formatedTask = $('<p class="task-item"></p>').text(loadedTask);
    //     $(formatedTask).addClass(i+'');
    //     $('.start-of_list').after(formatedTask);
    // }

    function displayTasksArray() {
        var getTasksJSON = localStorage.getItem('tasks');
        if (getTasksJSON) {
            var tasksArr = JSON.parse(getTasksJSON);
            for (var i = 0; i <= tasksArr.length; i++) {
                var formatedTask = $('<p class="task-item"></p>').text(tasksArr[i]);
                $('.start-of_list').after(formatedTask);
            }
        }
    }

    function displayDoneTasksArray() {
        var getTasksJSON = localStorage.getItem('done-tasks');
        if (getTasksJSON) {
            var tasksArr = JSON.parse(getTasksJSON);
            for (var i = 0; i <= tasksArr.length; i++) {
                var formatedTask = $('<p class="task-item_checked"></p>').text(tasksArr[i]);
                $('.start-of_list').after(formatedTask);
            }
        }
    }

    function displayDeletedTasksArray() {
        var getTasksJSON = localStorage.getItem('deleted-tasks');
        if (getTasksJSON) {
            var tasksArr = JSON.parse(getTasksJSON);
            for (var i = 0; i <= tasksArr.length; i++) {
                var formatedTask = $('<p class="deleted-task-item"></p>').text(tasksArr[i]);
                $('.start-of_list').after(formatedTask);
            }
        }
    }

    function pushTaskToArray(newTask) {
        var getTasksJSON = localStorage.getItem('tasks');
        if (getTasksJSON) {
            var getTasks = JSON.parse(getTasksJSON);
            getTasks.push(newTask);
            var pushArrJSON = JSON.stringify(getTasks);
            localStorage.setItem('tasks', pushArrJSON);
        } else {
            var tasksArr = [newTask];
            var tasksArrJSON = JSON.stringify(tasksArr);
            localStorage.setItem('tasks', tasksArrJSON);
        }
    }

    function pushDoneTaskToArray(newTask) {
        var getdoneTasksJSON = localStorage.getItem('done-tasks');
        if (getdoneTasksJSON) {
            var getDoneTasks = JSON.parse(getdoneTasksJSON);
            getDoneTasks.push(newTask);
            var pushArrJSON = JSON.stringify(getDoneTasks);
            localStorage.setItem('done-tasks', pushArrJSON);
        } else {
            var doneTasksArr = [newTask];
            var doneTasksArrJSON = JSON.stringify(doneTasksArr);
            localStorage.setItem('done-tasks', doneTasksArrJSON);
        }
    }

    function deleteDoneTaskFromArray(task) {
        var getTasksJSON = localStorage.getItem('tasks');
        if (getTasksJSON) {
            var getTasks = JSON.parse(getTasksJSON);

            for (var i=0; i <= getTasks.length; i++) {
                if (getTasks[i] === task) {
                    getTasks.splice(i,1);
                    i--;
                }
            }

            var pushArrJSON = JSON.stringify(getTasks);
            localStorage.setItem('tasks', pushArrJSON);
        }
    }

    function deleteDeletedTaskFromArray(task) {
        var getTasksJSON = localStorage.getItem('done-tasks');
        if (getTasksJSON) {
            var getTasks = JSON.parse(getTasksJSON);

            for (var i=0; i <= getTasks.length; i++) {
                if (getTasks[i] === task) {
                    getTasks.splice(i,1);
                    i--;
                }
            }

            var pushArrJSON = JSON.stringify(getTasks);
            localStorage.setItem('done-tasks', pushArrJSON);
        }
    }

    function pushDeletedTaskToArray(newTask) {
        var getDeletedTasksJSON = localStorage.getItem('deleted-tasks');
        if (getDeletedTasksJSON) {
            var getDeletedTasks = JSON.parse(getDeletedTasksJSON);
            getDeletedTasks.push(newTask);
            var pushArrJSON = JSON.stringify(getDeletedTasks);
            localStorage.setItem('deleted-tasks', pushArrJSON);
        } else {
            var deletedTasksArr = [newTask];
            var deletedTasksArrJSON = JSON.stringify(deletedTasksArr);
            localStorage.setItem('deleted-tasks', deletedTasksArrJSON);
        }
    }

    function whatToDisplay() {
        switch ($('#tasksToDisplay option:selected').val()) {
            case 'showAll':
                $('[class *= "item"]').css('display', 'block');
                $('.start-of_list').text('All your tasks:');
                break;
            case 'showActive':
                $('[class *= "item"]').css('display', 'none');
                $('.task-item').css('display', 'block');
                $('.start-of_list').text('Your active tasks:');
                break;
            case 'showDone':
                $('[class *= "item"]').css('display', 'none');
                $('.task-item_checked').css('display', 'block');
                $('.start-of_list').text('Your done tasks:');
                break;
            case 'showDeleted':
                $('[class *= "item"]').css('display', 'none');
                $('.deleted-task-item').css('display', 'block');
                $('.start-of_list').text('Your deleted tasks:');
                break;
            default:
                $('[class *= "item"]').css('display', 'none');
        }
    }

    $('#addTask').on('click', function (e) {
        e.preventDefault();
        addNewTask(); //to display new task at this session
        var newTask = $('#newTask').val();
        if (newTask) {
            pushTaskToArray(newTask);
            $('#newTask').val('');
            whatToDisplay();
        }
    });

    $('#deleteAll').on('click', function () {
        localStorage.clear();
        $('[class *= "item"]').css('display','none');
    });

    $(document).on('click', '.task-item', function CheckTask() {
        $(this).removeClass('task-item');
        $(this).addClass('task-item_checked');
        var newDoneTask = $(this).text();
        pushDoneTaskToArray(newDoneTask);
        deleteDoneTaskFromArray(newDoneTask);
        whatToDisplay();
    });

    $(document).on('dblclick', '.task-item_checked', function RemoveTask() {
        $(this).addClass('deleted-task-item');
        $(this).removeClass('task-item_checked');
        var newDeletedTask = $(this).text();
        pushDeletedTaskToArray(newDeletedTask);
        deleteDeletedTaskFromArray(newDeletedTask);
        whatToDisplay();
    });

    $(document).on('click', '.deleteSelected', function RemoveSelectedTasks() {
        var eqCounter = $('.task-item_checked').length;
        for (var i = 0; i <= eqCounter; i++) {
            var newDeletedTask = $('.task-item_checked').eq(i).text();
            pushDeletedTaskToArray(newDeletedTask);
            deleteDeletedTaskFromArray(newDeletedTask);
        }
        $('.task-item_checked').css('display','none').removeClass('task-item_checked');
        whatToDisplay();
    });

    $('[class *= "item"]').css('display', 'none');
    $('.task-item').css('display', 'block');
    $(document).on('click', '#tasksToDisplay', function () {
        whatToDisplay();
    });
});