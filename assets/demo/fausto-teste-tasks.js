function proccessMoveCard(card, origem, destino)
{
    var card_data_set = card.dataset;
    var destino_data_set = destino.dataset;
    var origem_data_set = origem.dataset;

    if(!card_data_set || !origem_data_set || !destino_data_set)
        return null;

    var card_id = card_data_set.cardId;
    var step_id_origem = origem_data_set.stepId;
    var step_id_destino = destino_data_set.stepId;
    console.log(card_id, step_id_origem, step_id_destino);
}

$('.checklist-toggler').click(function () {
	if (($(this).parents('.card-checklist').children('.checklist-container').css('display'))=="none") {
		$(this).parents('.card-checklist').children('.checklist-container').slideDown({duration:200});
		$(this).children('.fa').toggleClass('fa-angle-down fa-angle-left');
	} else {
		$(this).parents('.card-checklist').children('.checklist-container').slideUp({duration:200});
		$(this).children('.fa').toggleClass('fa-angle-down fa-angle-left');
	}
});


//ID of list
//Give ID to each nestable list and allow dragging between them
// $('#nestable-list-1, #nestable-list-2, #nestable-list-3, #nestable-list-4, #nestable-list-5, #nestable-list-6, #nestable-list-7, #nestable-list-8, #nestable-list-9').nestable({group: 1});
$('#nestable-list-1').nestable({group: 1});
$('#nestable-list-2').nestable({group: 2});
$('#nestable-list-3').nestable({group: 3});
// $('#nestable-list-4').nestable({group: 4});
// $('#nestable-list-5').nestable({group: 5});
// $('#nestable-list-6').nestable({group: 6});
// $('#nestable-list-7').nestable({group: 7});
// $('#nestable-list-8').nestable({group: 8});
// $('#nestable-list-9').nestable({group: 9});


//ID of Cards UL
// $('#sortable-tasks-1, #sortable-tasks-2, #sortable-tasks-3, #sortable-tasks-4, #sortable-tasks-5, #sortable-tasks-6, #sortable-tasks-7, #sortable-tasks-8, #sortable-tasks-9').sortable({
// 	connectWith: ".sortable-connected",
// 	receive: function (event, ui) {
// 		var lists = $('.sortable-connected');
// 		for (var i = lists.length - 1; i >= 0; i--) {
// 			//esta linha executa se nao tiver nenhum card na coluna para colocar uma coluna vazia
// 			if ($(lists[i]).children().length < 1) $(lists[i]).html('');
// 			document.getElementById('teste').innerHTML = document.getElementById('teste').innerHTML + i;
// 		};
// 	}
// });

$('[data-step-type=container][data-step-name]').sortable({
	connectWith: ".sortable-connected",
	receive: function (event, ui) {
		var lists = $('.sortable-connected');
		for (var i = lists.length - 1; i >= 0; i--) {
			//esta linha executa se nao tiver nenhum card na coluna para colocar uma coluna vazia
			if ($(lists[i]).children().length < 1) $(lists[i]).html('');
			document.getElementById('teste').innerHTML = 'de ' + i + ' para 3';
			// document.getElementById('teste').innerHTML = document.getElementById('teste').innerHTML + i;
		};
        //event.target.sortable( "cancel" );
        //TODO
        console.log('receive', ui, event);

        var card = ui.item.context;
        var origem = ui.sender.context;
        var destino = this;

        if(card, origem, destino)
            proccessMoveCard(card, origem, destino);
	},
	remove: function (event, ui) {
		var lists = $('.sortable-connected');
		for (var i = lists.length - 1; i >= 0; i--) {
			//esta linha executa se nao tiver nenhum card na coluna para colocar uma coluna vazia
			if ($(lists[i]).children().length < 1) $(lists[i]).html('');
			document.getElementById('teste').innerHTML = 'de ' + i + ' para 3';
			// document.getElementById('teste').innerHTML = document.getElementById('teste').innerHTML + i;
		};
        console.log('remove');
	}
});

$( function () {

	$('.card-task .checkbox-inline .iCheck-helper').click( function () {
		var total = $(this).closest('.card-task').find('.checkbox-inline input').length;
		var checked = $(this).closest('.card-task').find('.checkbox-inline input:checked').length;
		$(this).closest('.card-task').find('.card-done').html(checked+'/'+total);
		$(this).closest('.card-task').find('.progress-bar').css("width", (checked/total)*100+'%');
	});

	$('.card-task').each( function () {
		var total = $(this).find('.checkbox-inline input').length;
		var checked = $(this).find('.checkbox-inline input:checked').length;
		$(this).find('.card-done').html(checked+'/'+total);
		$(this).find('.progress-bar').css("width", (checked/total)*100+'%');
	});

	$('.card-task .card-options .toggle-check').click( function () {
		if ($(this).find('i').hasClass('fa-check')) {
			$(this).closest('.card-task').find('div.icheckbox_minimal-blue:not(.checked) .iCheck-helper').click();
			$(this).find('i').removeClass('fa-check').addClass('fa-undo');
		}
		else {
			$(this).closest('.card-task').find('div.icheckbox_minimal-blue.checked .iCheck-helper').click();
			$(this).find('i').removeClass('fa-undo').addClass('fa-check');
		}
	});

});
