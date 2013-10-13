ResumeModel = Backbone.Model.extend({
    urlRoot : '/get_resume'
});

ResumeView = Backbone.View.extend({
    el: $('#resume'),
    events: {
	'click .btn-toggle-content': 'toggleInfo',
	'click #btn-toggle-blob': 'toggleBlob',
	'click #btn-send-blob': 'sendBlob'
    },
    initialize: function () {
        _.bindAll(this, 'render');  
        this.model.bind('change', this.render);  
	this.model.fetch ();
    },
    render: function () {
	var variables = this.model.attributes;
	
	var template = _.template($("#resume-template").html(), variables);
	this.$el.html(template);
	
	this.$(".tooltip-origin").tooltip();
	$('body').scrollspy({ target: '#header' })
	
	// Smooth scrolling
	var $root = $('html, body');
	this.$('.smooth-scroller').click(function() {
	    $root.animate({
		scrollTop: $( $.attr(this, 'href') ).offset().top
	    }, 500);
	    return false;
	});
    },
    toggleInfo: function (event) {
	item_name = event.currentTarget.dataset.content;
	this.$('.' + item_name + '-hideable').slideToggle("slow");
	this.$('.btn-icon-' + item_name).toggleClass ('glyphicon-chevron-down');
	this.$('.btn-icon-' + item_name).toggleClass ('glyphicon-chevron-up');
	this.$('.btn-text-' + item_name).toggle ();
    },
    toggleBlob: function (event) {
	this.$('#toggle-blob-row').slideToggle ('slow');
    },
    sendBlob: function (event) {
	var blobFrom = this.$('#blobFrom').val ();
	var blobContent = this.$('#blobContent').val ();
	var error = false;
	if (blobFrom === "") {
	    error = true;
	    this.$('#blob-from-error').html ('This field must not be empty!');
	    this.$('#form-group-blob-from').addClass ('has-error');
	} else {
	    this.$('#blob-from-error').html ('');
	    this.$('#form-group-blob-from').removeClass ('has-error');
	}
	if (blobContent === "") {
	    error = true;
	    this.$('#blob-content-error').html ('This field must not be empty!');
	    this.$('#form-group-blob-content').addClass ('has-error');
	} else {
	    this.$('#blob-content-error').html ('');
	    this.$('#form-group-blob-content').removeClass ('has-error');
	}

	if (!error) {
	    var template = _.template($("#blob-template").html(), { status: 42 });
	    this.$('#blob-status').html(template);
	    var self = this;
	    $.ajax ({
		type: "POST",
		url: '/blob',
		data: {blobFrom: blobFrom, blobContent: blobContent},
		success: function (response) {
		    var variables = response;
		    var template = _.template($("#blob-template").html(), variables);
		    self.$('#blob-status').html(template);
		}
	    });
	}
    }
});

var resume_view = new ResumeView ( { model: new ResumeModel () } );

