let VERSIONS = ['1.16', '1.15', '1.14', '1.13', '1.12', '1.11', '1.10', '1.9', '1.8'];
let COMMANDS = 1;
let THREAD = {
    name: 'Some name',
    version: '1.0.0',
    supportedVersions: [
    ]
};

function load() {
    let name = $("#name").val();

    $.ajax({
        type        : "GET",
        url         : "/api/index.php?thread=" + name,
        beforeSend: function() {
            // setting a timeout
        },
    }).done(function(data) {
        $("#name").val(data.data.name);
        $("#version").val(data.data.version);
        $("#label_v_1_16").val(data.data.supportedVersions[0].version);
        let vi = 0;
        for (let v in VERSIONS){
            $('#v_' + VERSIONS[v].replace(".", "_")).prop('checked', data.data.supportedVersions[vi].supported);
            $("#label_v_" + VERSIONS[v].replace(".", "_")).val(data.data.supportedVersions[vi].version);
            ++vi;
        }
    });
}

function createCommandForm() {
    let counter = parseInt($("#commands-counter").html());

    $("#commands-form").append('<div class="col-12">\n' +
        '                                <input type="text" id="command-"' + counter + ' placeholder="/example <uuid> <itemid> <amount>" style="width:100%;">\n' +
        '                                <input type="text" id="command-permission-"' + counter + ' placeholder="/example <uuid> <itemid> <amount>" style="width:100%;">\n' +
        '                                <textarea id="command-desc-' + counter + '" style="width:100%;height:100px;" placeholder="Describe the usage of the commands."></textarea>\n' +
        '                            </div>');
    $("#commands-counter").html(counter+1);
    COMMANDS = COMMANDS + 1;
};

function finishThread() {
    THREAD.name = $("#name").val();
    $("#d-name").html(THREAD.name+'<span>' + $("#name").val() + '</span>');
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

    for(let i = 1;i <= COMMANDS;++i){
        commandStr += ' <tr>\n' +
        '                            <td><b>' + $("#command-" + i).val() + '</b></td>\n' +
        '                            <td style="color:#aaa;">' + $("#command-desc-" + i).val() + '</td>\n' +
        '                            <td style="color:#aa8684;">' + $("#command-permission-" + i).val() + '</td>\n' +
        '                        </tr>';
    }

    $("#commands-table").html(commandStr);

    $("#supported-versions").html(supportedVersionsStr);

    $("#screen").fadeIn(100);

    $.ajax({
        type        : "POST",
        url         : "/api/index.php",
        data        : THREAD,
        beforeSend: function() {
            // setting a timeout
        },
    }).done(function(data) {
    });
};
