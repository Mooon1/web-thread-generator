let VERSIONS = ['1.16', '1.15', '1.14', '1.13', '1.12', '1.11', '1.10', '1.9', '1.8'];
let COMMANDS = 0;
let FEATURES = 0;
let THREAD = {
    name: 'Some name',
    version: '1.0.0',
    description: 'Enter a plugin description.',
    supportedVersions: [
    ],
    features: [],
    commands: []
};

function load() {
    let name = $("#name").val();

    $.ajax({
        type        : "GET",
        url         : "app/index.php?thread=" + name,
        beforeSend: function() {
            // setting a timeout
        },
    }).done(function(data) {
        THREAD = JSON.parse(data).data;
        $("#name").val(THREAD.name);
        $("#version").val(THREAD.version);
        $("#description").val(THREAD.description);
        for (let v in VERSIONS){
            let supported = THREAD.supportedVersions[v].supported;

            if("true" == supported){
                $('#v_' + VERSIONS[v].replace(".", "_")).prop('checked', true);
            }else {
                $('#v_' + VERSIONS[v].replace(".", "_")).prop('checked', false);
            }

            $("#label_v_" + VERSIONS[v].replace(".", "_")).val(THREAD.supportedVersions[v].version);
        }

        for(let c in THREAD.commands){
            let cmd = THREAD.commands[c];
            createCommandFormWithValues(cmd.command, cmd.description, cmd.permission);
        }

        for(let f in THREAD.features){
            let featr = THREAD.features[f];
            createFeatureFormWithValues(featr.title, featr.description);
        }

        finishThread(false);
    });
}

function createCommandFormWithValues(command, desc, perm) {
    $("#commands-form").append('<div class="col-12">\n' +
        '                                <input type="text" id="command-' + COMMANDS + '" value="' + command + '" style="width:100%;">\n' +
        '                                <input type="text" id="command-permission-' + COMMANDS + '" value="' + desc + '" style="width:100%;">\n' +
        '                                <textarea id="command-desc-' + COMMANDS + '">' + perm + '</textarea>\n' +
        '                            </div>');
    COMMANDS++;
    $("#commands-counter").html(COMMANDS);
}

function createCommandForm() {
    $("#commands-form").append('<div class="col-12">\n' +
        '                                <input type="text" id="command-' + COMMANDS + '" placeholder="/example <uuid> <itemid> <amount>" style="width:100%;">\n' +
        '                                <input type="text" id="command-permission-' + COMMANDS + '" placeholder="plugin.command.example" style="width:100%;">\n' +
        '                                <textarea id="command-desc-' + COMMANDS + '" style="width:100%;height:100px;" placeholder="Describe the usage of the commands."></textarea>\n' +
        '                            </div>');
    COMMANDS++;
    $("#commands-counter").html(COMMANDS);
}

function createFeatureForm() {
    $("#featuers-form").append('<div class="col-12">\n' +
        '                                <input type="text" id="feature-' + FEATURES + '" placeholder="Name your feature" style="width:100%;">\n' +
        '                                <textarea id="feature-desc-' + FEATURES + '" style="width:100%;height:100px;" placeholder="Describe the feature."></textarea>\n' +
        '                            </div>');
    FEATURES++;
    $("#features-counter").html(FEATURES);
}

function createFeatureFormWithValues(title, desc) {
    $("#featuers-form").append('<div class="col-12">\n' +
        '                                <input type="text" id="feature-' + FEATURES + '" value="' + title + '" style="width:100%;">\n' +
        '                                <textarea id="feature-desc-' + FEATURES + '" style="width:100%;height:100px;">' + desc + '</textarea>\n' +
        '                            </div>');
    FEATURES++;
    $("#features-counter").html(FEATURES);
}

function finishThread(withSave) {
    THREAD.name = $("#name").val();
    $("#d-name").html('<span>' + THREAD.name + '</span>');
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

    if(true === withSave){
        $.ajax({
            type        : "POST",
            url         : "app/index.php",
            data        : THREAD,
            beforeSend: function() {
                // setting a timeout
            },
        }).done(function(data) {
        });
    }
}
