let VERSIONS = ['1.16', '1.15', '1.14', '1.13', '1.12', '1.11', '1.10', '1.9', '1.8'];
let THREAD = {
    name: 'Some name',
    version: '1.0.0',
    supportedVersions: [
    ]
};

function createCommandForm() {
    let counter = parseInt($("#commands-counter").html());
    let html = $("#commands-form").html() + '<div class="col-12">\n' +
        '                                <input type="text" id="command-"' + counter + ' placeholder="/example <uuid> <itemid> <amount>" style="width:100%;">\n' +
        '                                <textarea id="command-desc-' + counter + '" style="width:100%;height:100px;" placeholder="Describe the usage of the commands."></textarea>\n' +
        '                            </div>';

    $("#commands-form").html(html);
    $("#commands-counter").html(counter+1);
};

function finishThread() {
    THREAD.name = $("#d-name").html();
    $("#d-name").html(THREAD.name+'<span>' + $("#name").val() + '</span>');
    THREAD.version = $("#d-version").html();
    $("#d-version").html(THREAD.version+'<span>' + $("#version").val() + '</span>');

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

    $("#supported-versions").html(supportedVersionsStr);
    console.log(THREAD);
};
