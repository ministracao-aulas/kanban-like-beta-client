window.CARDS_API_PORT = window.CARDS_API_PORT || '8000';
window.CARDS_API_BASE_URL = window.CARDS_API_BASE_URL || `${window.location.protocol}//${window.location.hostname}:${window.CARDS_API_PORT}`;


function easyFilter(obj, key, must_be)
{
	if (!obj.length) return [];

	var _filtered = [];
	obj.forEach((item, k) => {
		if (key in item && item[key] == must_be) {
		_filtered.push(item);
		}
	});

	return _filtered;
}

function createCard(card_data)
{
	if(!card_data || !card_data.id || !card_data.step || !card_data.step.id)
	{
		return
	}

	var step = card_data.step;
	var step_selector = `[data-step-type=container][data-step-id="${step.id}"]`;
	var target_column = document.querySelector(step_selector);

	if(!target_column)
	{
		console.log("Não foi possível encontrar a coluna de destino");
		return;
	}

	var tags = card_data.tags;
	var tags_html = '';
	if(tags.length > 0)
	{
		tags.forEach(function(tag) {
			tags_html = tags_html + `<span title="${tag.title}"
			class="label popovers"
			style="margin-right: 3px; background-color: ${tag.color};"
			>${tag.title}</span>`
		});
	}

	var checklist = card_data.checklist;
	var checklist_html = '';
	var checklist_total = checklist.items.length;
	var checklist_total_done = easyFilter(checklist.items, 'done', true).length;
	if(checklist_total > 0)
	{
		var checklist_items = '';
		var checklist_prefix = card_data.id+'-chklst';
		checklist.items.forEach(function(item, key) {
			var checked = item.done ? 'checked' : '';

			checklist_items = checklist_items + `
				<li class="checklist-item dd-item" data-id="${checklist_prefix}-${key+1}">
					<div class="dd-handle">
						<div class="checkbox-inline icheck"><input type="checkbox" ${checked}></div>
						${item.title}
					</div>
				</li>
			`;
		});

		checklist_html = `
			<div class="card-checklist">
				<div class="clearfix checklist-toggler" has-toggler-listener="false">
					<h4>${checklist.title}</h4>
					<i class="fa fa-angle-left"></i>
				</div>

				<div class="checklist-container dd" id="nestable-list-${card_data.id}" style="display: none">
					<ol class="dd-list">
						${checklist_items}
					</ol>

				</div>
			</div>
		`;
	}

	var card_color = card_data.color ? card_data.color : '#a3bdb9';
	var card_custom_progress_bar_color = `background-color: ${card_color};`;

	var percent_done = (checklist_total_done/checklist_total)*100;
	var cars_html_content = `
	<div class="card-handle"></div>
		<div class="card-title">
			<h3>${card_data.title}</h3>
			<div class="card-done">${checklist_total_done}/${checklist_total}</div>
		</div>
		<div class="progress progress-lg">
			<div class="progress-bar custom-progress-bar-color" style="width: ${percent_done}%; ${card_custom_progress_bar_color}"></div>
		</div>

		<p class="card-desc">
			${card_data.description}
		</p>
		<div class="card-options">
			<div class="pull-left">
				${tags_html}
			</div>
			<div class="pull-right">
				<div class="btn-group">
					<a class="btn btn-default-alt btn-xs" href="#"><i
							class="fa fa-fw fa-pencil"></i></a>
					<a class="btn btn-default-alt btn-xs" href="#"><i class="fa fa-fw fa-times"></i></a>
				</div>
			</div>
		</div>

		${checklist_html}
	`

	var card_element = document.createElement('li');
	card_element.classList.add('card-task');
	card_element.classList.add('custom-card-color');
	card_element.style.borderColor = card_data.color;
	card_element.id = card_data.id;
	card_element.setAttribute('data-step-type', 'card');
	card_element.setAttribute('data-card-id', card_data.id);
	card_element.innerHTML = cars_html_content;
	target_column.appendChild(card_element);
}

function loadPopovers()
{
	$('.popovers').popover({container: 'body', trigger: 'hover', placement: 'top'}); //bootstrap's popover
	$('.tooltips').tooltip(); //bootstrap's tooltip
}

function loadCustomCheckboxes()
{
	//Custom checkboxes
    //------------------------
	$(".bootstrap-switch").bootstrapSwitch();
	$('.icheck input').iCheck({
		checkboxClass: 'icheckbox_minimal-blue',
		radioClass: 'iradio_minimal-blue'
	});
}

function loadICheckListeners()
{
	//------------------------------

	$('.card-task .checkbox-inline .iCheck-helper').click( function () {
		var total = $(this).closest('.card-task').find('.checkbox-inline input').length;
		var checked = $(this).closest('.card-task').find('.checkbox-inline input:checked').length;
		$(this).closest('.card-task').find('.card-done').html(checked+'/'+total);
		$(this).closest('.card-task').find('.progress-bar').css("width", (checked/total)*100+'%');
	});

	document.querySelectorAll('.card-task').forEach(function(card) {
		var all_inputs = card.querySelectorAll('.checkbox-inline input');
		var total = all_inputs.length;
		var total_checked = easyFilter(all_inputs, 'checked', true).length;
		card.querySelector('.card-done').innerHTML = total_checked+'/'+total;
		card.querySelector('.progress-bar').style.width = (total_checked/total)*100+'%';
	});
	/**/

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
}

function checkListTogler()
{
	/****
	 * Permite os toggles dos checklists serem ordenados
	 * https://www.jqueryscript.net/other/Mobile-Compatible-jQuery-Drag-Drop-Plugin-Nestable.html
	 * https://github.com/dbushell/Nestable
	 *
	 * !! Nova versão??? https://github.com/RamonSmit/Nestable2
	 */
	$('.dd').nestable({ maxDepth: 1 });

	$('.checklist-container.dd').on('change', function() {
		/* on change event */
		console.log('change checklist order', $(this).nestable('serialize'));

	});

	$('.checklist-toggler[has-toggler-listener=false]').click(function () {
		if (($(this).parents('.card-checklist').children('.checklist-container').css('display'))=="none")
		{
			$(this).parents('.card-checklist').children('.checklist-container').slideDown({duration:200});
			$(this).children('.fa').toggleClass('fa-angle-down fa-angle-left');
		} else {
			$(this).parents('.card-checklist').children('.checklist-container').slideUp({duration:200});
			$(this).children('.fa').toggleClass('fa-angle-down fa-angle-left');
		}
		$(this).attr('has-toggler-listener', 'true');
	});
}

function loadCards()
{
	if(!window.CARDS_API_BASE_URL)
	{
		return;
	}

	var CARDS_API_BASE_URL = window.CARDS_API_BASE_URL;
	var _Headers = new Headers();

	var _options = {
		method: 'GET',
		headers: _Headers,
		mode: 'cors',
		cache: 'default'
	};

	var _request = new Request(CARDS_API_BASE_URL+'/api/cards', _options);

	fetch(_request)
		.then(function (response)
		{
			return response.json();
		})
		.then(function (cards)
		{
			cards.forEach(function(card_data) {
				createCard(card_data);
			});
			callAllLoaders();
		}).catch(function (errors)
		{
			console.log(errors);
		});
}

function dropZoneForEmptyStepList()
{
	var lists = $('.sortable-connected');
	for (var i = lists.length - 1; i >= 0; i--) {
		if ($(lists[i]).children().length < 1) $(lists[i]).html('');
	};
}

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


$('[data-step-type=container][data-step-name]').sortable({
	connectWith: ".sortable-connected",
	receive: function (event, ui) {
		dropZoneForEmptyStepList();

        var card = ui.item.context;
        var origem = ui.sender.context;
        var destino = this;

        if(card, origem, destino)
            proccessMoveCard(card, origem, destino);
	},
	remove: function (event, ui) {
		dropZoneForEmptyStepList();
        console.log('remove');
	}
});

function callAllLoaders()
{
	loadPopovers();
	loadCustomCheckboxes();
	loadICheckListeners();
	dropZoneForEmptyStepList();
	checkListTogler();
}

$( function () {
	loadCards();
	callAllLoaders();
	checkListTogler();
});
