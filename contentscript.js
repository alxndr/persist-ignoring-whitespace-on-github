
 $(function() {

    chrome.extension.sendMessage({},function(response){

        var isOn = response.isOn;

        if(isOn){

            // GET ALL PAGE ANCHORS
            var anchors = $('a');

            anchors.each(function(i, a){

                // GET HREF
                var href = $(a).attr('href');

                // ADD '?W=1' WHEN /commit/ LINK
                if(href && href.match(/\/commit\//)) {
                    href = href.replace(/#.*/g,''); // remove any hashes
                    $(a).attr('href', href+'?w=1');
                }
            });
        }
    });


});
