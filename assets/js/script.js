let VERSIONS = ['1.16', '1.15', '1.14', '1.13', '1.12', '1.11', '1.10', '1.9', '1.8'];
let COMMANDS = 0;
let THREAD = {
    name: 'Some name',
    version: '1.0.0',
    supportedVersions: [
    ],
    commands: []
};

function load() {
    let name = $("#name").val();

    $.ajax({
        type        : "GET",
        url         : "/app/index.php?thread=" + name,
        beforeSend: function() {
            // setting a timeout
        },
    }).done(function(data) {
        data = JSON.parse(data);
        $("#name").val(data.data.name);
        $("#version").val(data.data.version);
        for (let v in VERSIONS){
            let supported = data.data.supportedVersions[v].supported;

            if("true" == supported){
                $('#v_' + VERSIONS[v].replace(".", "_")).prop('checked', true);
            }else {
                $('#v_' + VERSIONS[v].replace(".", "_")).prop('checked', false);
            }

            $("#label_v_" + VERSIONS[v].replace(".", "_")).val(data.data.supportedVersions[v].version);
        }

        for(let c in data.data.commands){
            let cmd = data.data.commands[c];
            createCommandFormWithValues(cmd.command, cmd.description, cmd.permission);
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
        '                                <input type="text" id="command-permission-' + COMMANDS + '" placeholder="/example <uuid> <itemid> <amount>" style="width:100%;">\n' +
        '                                <textarea id="command-desc-' + COMMANDS + '" style="width:100%;height:100px;" placeholder="Describe the usage of the commands."></textarea>\n' +
        '                            </div>');
    COMMANDS++;
    $("#commands-counter").html(COMMANDS);
}

function finishThread(withSave) {
    THREAD.name = $("#name").val();
    $("#d-name").html('<span>' + THREAD.name + '</span>');
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

    $("#supported-versions").html(supportedVersionsStr);

    $("#screen").fadeIn(100);

    if(true === withSave){
        $.ajax({
            type        : "POST",
            url         : "/app/index.php",
            data        : THREAD,
            beforeSend: function() {
                // setting a timeout
            },
        }).done(function(data) {
        });
    }
}
