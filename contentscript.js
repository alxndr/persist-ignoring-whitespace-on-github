/*
 * Copyright (c) 2010 The Chromium Authors. All rights reserved.  Use of this
 * source code is governed by a BSD-style license that can be found in the
 * LICENSE file.
 */
 $(function() {

    chrome.extension.sendMessage({greeting:"color"},function(response){

        var isOn = response.isOn;

        if(isOn){
            // GET ALL PAGE ANCHORS
            var anchors = $('a');

            anchors.each(function(i, a){

                // GET HREF
                var href = $(a).attr('href');

                // ADD '?W=1' WHEN COMMIT LINK
                if(href && href.match(/\/commit\//)) {
                    href = href.replace(/#/g,''); // remove any hashes
                    $(a).attr('href', href+'?w=1');
                }
            });
        }
    });


});
