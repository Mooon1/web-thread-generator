function finishThread(withDownload, asPrint) {
    asPrint = typeof asPrint != "undefined";
    THREAD.name = $("#name").val();
    $("#d-name").html('<span>' + THREAD.name + '</span>');
    $("#icon").html(THREAD.name.substring(0, 7).toUpperCase());
    THREAD.description = $("#description").val();
    $("#d-description").html('<span>' + THREAD.description + '</span>');
    THREAD.version = $("#version").val();
    $("#d-version").html('Version: '+'<span>' + THREAD.version + '</span>');

    THREAD.supportedVersions = [];
    let supportedVersionsStr = '';
    let versionVal;

    for (let v in VERSIONS){
        versionVal = $('#v_' + VERSIONS[v].replace(".", "_")).prop('checked');
        THREAD.supportedVersions.push({
            version: VERSIONS[v],
            supported: versionVal
        });
        supportedVersionsStr += versionVal ? '<div class="col-1"><h3><span class="badge rounded-pill bg-success">' + VERSIONS[v] + '</span></h3></div>' : '<div class="col-1"><h3><span class="badge rounded-pill bg-danger">' + VERSIONS[v] + '</span></h3></div>';
    }

    if(0 >= FEATURES){
        $("#features").hide();
    }

    if(0 >= COMMANDS){
        $("#commands").hide();
    }

    let commandStr = '';

    for(let i = 0;i < COMMANDS;i++){
        THREAD.commands[i] = {
            "command": $("#command-" + i).val(),
            "description": $("#command-desc-" + i).val(),
            "permission": $("#command-permission-" + i).val(),
        };

        commandStr += ' <tr>\n' +
            '                            <td><b>' + THREAD.commands[i].command + '</b></td>\n' +
            '                            <td style="color:#aaa;">' + THREAD.commands[i].description + '</td>\n' +
            '                            <td style="color:#aa8684;">' + THREAD.commands[i].permission + '</td>\n' +
            '                        </tr>';
    }
    $("#commands-table").html(commandStr);

    let featureStr = '';

    for(let i = 0;i < FEATURES;i++){
        THREAD.features[i] = {
            "title": $("#feature-" + i).val(),
            "description": $("#feature-desc-" + i).val(),
            "version": (typeof THREAD.features[i] == "undefined") ? THREAD.version : THREAD.features[i].version
        };

        featureStr += '<a href="#" class="list-group-item list-group-item-action" aria-current="true">\n' +
            '                                <div class="d-flex w-100 justify-content-between">\n' +
            '                                    <h5 class="mb-1">' + THREAD.features[i].title + '</h5>\n' +
            '                                    <small>VERSION ' + THREAD.features[i].version + '</small>\n' +
            '                                </div>\n' +
            '                                <p class="mb-1">' + THREAD.features[i].description + '</p>\n' +
            '                            </a>';
    }

    $("#features-list").html(featureStr);

    $("#supported-versions").html(supportedVersionsStr);

    $("#screen").fadeIn(100);

    if(true === withDownload){
        window.open('app/dl.php?t=' + btoa(JSON.stringify(THREAD)), '_blank');
        return;
    }

    if(true === asPrint){
        window.open('app/print.php?t=' + btoa(JSON.stringify(THREAD)), '_blank');
    }
}
