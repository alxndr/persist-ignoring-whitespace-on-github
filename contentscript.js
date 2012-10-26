/*
 * Copyright (c) 2010 The Chromium Authors. All rights reserved.  Use of this
 * source code is governed by a BSD-style license that can be found in the
 * LICENSE file.
 */
 $(function() {
    if(window.location.search == '?w=1'){
        var a = $('a');
        var href = a.attr('href');
        a.each(function(){
            a.attr('href', href+'?w=1');
        });
    }
});

