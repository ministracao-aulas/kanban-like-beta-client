function createCard(card_data)
{
	if(!card_data || !card_data.step || !card_data.step.id)
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
			tags_html = tags_html + `<span class="label label-midnightblue_" style="margin-right: 3px; background-color: ${tag.color};">${tag.title}</span>`

		});
	}

	var checklist = card_data.checklist;
	var checklist_html = checklist.items.length > 0 ? `
	<div class="card-checklist">
		<div class="clearfix checklist-toggler">
			<h4>${checklist.title}</h4>
			<i class="fa fa-angle-left"></i>
		</div>

		<div class="checklist-container dd" id="nestable-list-7" style="display: none">
			<ol class="dd-list">
				<li class="checklist-item dd-item" data-id="1">
					<div class="dd-handle">
						<div class="checkbox-inline icheck"><input type="checkbox"></div>
						User dashboard
					</div>
				</li>
				<li class="checklist-item dd-item" data-id="2">
					<div class="dd-handle">
						<div class="checkbox-inline icheck"><input type="checkbox" checked></div>
						User settings
					</div>
				</li>
				<li class="checklist-item dd-item" data-id="3">
					<div class="dd-handle">
						<div class="checkbox-inline icheck"><input type="checkbox"></div>
						User profile
					</div>
				</li>
				<li class="checklist-item dd-item" data-id="4">
					<div class="dd-handle">
						<div class="checkbox-inline icheck"><input type="checkbox"></div>
						Edit profile
					</div>
				</li>
				<li class="checklist-item dd-item" data-id="5">
					<div class="dd-handle">
						<div class="checkbox-inline icheck"><input type="checkbox"></div>
						User uploads
					</div>
				</li>
			</ol>

		</div>
	</div>
	` : "";

	var card_color = card_data.color ? card_data.color : '#a3bdb9';
	var card_custom_progress_bar_color = `background-color: ${card_color};`;

	var cars_html_content = `
	<div class="card-handle"></div>
		<div class="card-title">
			<h3>${card_data.title}</h3>
			<div class="card-done">0/5</div>
		</div>
		<div class="progress progress-lg">
			<div class="progress-bar custom-progress-bar-color" style="width: 20%; ${card_custom_progress_bar_color}"></div>
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


function loadCards()
{
	var cards = [
		{
			"title": "Card 4KK65",
			"id": "45",
			"step": {
				"title": "planejamento",
				"id": 2000
			},
			"color": "#ff0000",
			"description": "QFbkogOibJOeXBu",
			"tags": [
				{
				"title": "ayu",
				"color": "#ff7f50"
				},
				{
				"title": "iPA9R",
				"color": "#ff0000"
				},
				{
				"title": "C8Wn",
				"color": "#00ff00"
				}
			],
			"checklist": {
				"title": "Checklist UMwQT",
				"items": [
				{
					"done": false,
					"title": "Checklist item hheLb"
				},
				{
					"done": true,
					"title": "Checklist item Io23v"
				},
				{
					"done": false,
					"title": "Checklist item NaWcF"
				},
				{
					"done": false,
					"title": "Checklist item 1BjgY"
				}
				]
			}
		},
		{
			"title": "Card 4KK65",
			"id": "45",
			"step": {
				"title": "planejamento",
				"id": 2000
			},
			"color": "#00ffff",
			"description": "QFbkogOibJOeXBu",
			"tags": [
				{
				"title": "ayu",
				"color": "#ff7f50"
				},
				{
				"title": "iPA9R",
				"color": "#ff0000"
				},
				{
				"title": "C8Wn",
				"color": "#00ff00"
				}
			],
			"checklist": {
				"title": "Checklist UMwQT",
				"items": [
				{
					"done": false,
					"title": "Checklist item hheLb"
				},
				{
					"done": true,
					"title": "Checklist item Io23v"
				},
				{
					"done": false,
					"title": "Checklist item NaWcF"
				},
				{
					"done": false,
					"title": "Checklist item 1BjgY"
				}
				]
			}
		}
	];

	cards.forEach(function(card_data) {
		createCard(card_data);
	});
}

function dropZoneToEmpties()
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

	dropZoneToEmpties();
	loadCards();
});

$('[data-step-type=container][data-step-name]').sortable({
	connectWith: ".sortable-connected",
	receive: function (event, ui) {
		dropZoneToEmpties();

        var card = ui.item.context;
        var origem = ui.sender.context;
        var destino = this;

        if(card, origem, destino)
            proccessMoveCard(card, origem, destino);
	},
	remove: function (event, ui) {
		dropZoneToEmpties();
        console.log('remove');
	}
});
