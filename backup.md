 <% for(let i=0; i<executeDailyLogs.length; i++) { %>

                                        <% if(executeDailyLogs[i].activity == "Checked In" ) { %>
                                            <div class="activity-log">
                                                <div class="card-title-small">
                                                    <%= executeDailyLogs[i].full_name %>
                                                </div>
                                                <div class="checkin-text activity-log-text">Checked In</div>
                                                <div class="log-time">
                                                    <%= executeDailyLogs[i].time %>
                                                </div>
                                            </div>
                                            <% } %>

                                        <% if(executeDailyLogs[i].activity == "Breaked In" ) { %>
                                            <div class="activity-log">
                                                <div class="card-title-small"><%= executeDailyLogs[i].full_name %></div>
                                                <div class="breakin-text activity-log-text">Break In</div>
                                                <div class="log-time"><%= executeDailyLogs[i].time %></div>
                                            </div>
                                        <% } %>

                                        <% if(executeDailyLogs[i].activity == "Breaked Out" ) { %>

                                            <div class="activity-log">
                                                <div class="card-title-small"><%= executeDailyLogs[i].full_name %></div>
                                                <div class="breakout-text activity-log-text">Break Out</div>
                                                <div class="log-time"><%= executeDailyLogs[i].time %></div>
                                            </div>

                                        <% } %>

                                        <% if(executeDailyLogs[i].activity == "Checked Out" ) { %>
                                            <div class="activity-log">
                                                <div class="card-title-small"><%= executeDailyLogs[i].full_name %></div>
                                                <div class="checkout-text activity-log-text">Checked Out</div>
                                                <div class="log-time"><%= executeDailyLogs[i].time %></div>
                                            </div>
                                        <% } %>
                                            
                                            <% } %>