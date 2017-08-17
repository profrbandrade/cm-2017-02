/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        $("#searchButton").on("click", function(e) {

            var search = $("#searchField").val();
            
            if (search === "") return;

            $(this).prop("disabled", true);

            $("#results").html("<i>Buscando resultados para " + search + "...</i>");

            $.get("https://api.github.com/search/repositories",
                {"q":search},
                function (res, code) {

                    if (res.items && res.items.length) {
                        var s = "<h2>Resultados</h2>";
                        var len = res.items.length;
        
                        for (var i = 0; i < len; i++) {
                            var entry = res.items[i];
                            s += "<p><strong>" + entry.name + "</strong><br/>";
                            s += "Autor: " + entry.owner.login + "<br/>";
                            s += "Atualizado em: " + entry.updated_at + "<br/>";
                            s += entry.description;
                            s += "</p>";
                        }

                        $("#results").html(s);
                    }

                    $("#searchButton").prop("disabled", false);
            });
        });

    }
};

app.initialize();
