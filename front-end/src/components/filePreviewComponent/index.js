import React, {Component} from "react";
import './style.css';
import {XCircle} from "react-feather";

class FilePreviewComponent extends Component {
    constructor(props) {
        super(props);
    }

    mimeTypeToText = (mimeType) => {
        if(["image/bmp", "image/png", "image/gif", "image/jpeg", "image/svg+xm"].indexOf(mimeType) > -1)
            return "Immagine";

        if(["application/pdf"].indexOf(mimeType) > -1)
            return "PDF";

        if(["video/mpeg", "video/ogg", "video/mp2t", "video/webm", "video/3gpp", "video/3gpp2", "video/x-msvideo"].indexOf(mimeType) > -1)
            return "Video";

        if(["application//x-7z-compressed", "application/x-bzip", "application/x-bzip2", "application/gzip", "application/x-tar", "application/vnd.rar"].indexOf(mimeType) > -1)
            return "Archivio Compresso";

        if(["application/octet-stream"].indexOf(mimeType) > -1)
            return "Binary data";

        if(["text/js"].indexOf(mimeType) > -1)
            return "Javascript";

        if(["audio/mpeg", "audio/midi", "audio/x-midi", "audio/ogg", "audio/opus", "audio/wav", "audio/webm", "audio/3gpp", "audio/3gpp2"].indexOf(mimeType) > -1)
            return "Audio";

        if(["application/xhtml+xml"].indexOf(mimeType) > -1)
            return "XHTML";

        if(["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"].indexOf(mimeType) > -1)
            return "Microsoft Excel";

        if(["application/vnd.visio"].indexOf(mimeType) > -1)
            return "Microsoft Visio";

        if(["text/plain"].indexOf(mimeType) > -1)
            return "File di testo";

        if(["application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/vnd.ms-powerpoint"].indexOf(mimeType) > -1)
            return "Microsoft PowerPoint";

        if(["application/x-httpd-php"].indexOf(mimeType) > -1)
            return "PHP";

        if(["application/json"].indexOf(mimeType) > -1)
            return "JSON";

        if(["text/html"].indexOf(mimeType) > -1)
            return "HTML";

        if(["text/css"].indexOf(mimeType) > -1)
            return "CSS";

        return "File generico"
    };

    render() {
        let {file} = this.props;
        return(
            <div className={"d-flex filePreviewContainer justify-content-between mb-3"}>
                <div className={"d-flex"}>
                    <div className={"previewFileImage"} />
                    <div className={"previewFileInformation d-flex flex-column justify-content-center ml-2"}>
                        <div className={"previewFileName"} style={{fontSize: file.name.length < 50 ? 18 : 15}}>
                            {file.name}
                        </div>
                        <div className={"text-muted"} style={{fontSize: 15}}>
                            {this.mimeTypeToText(file.type)}
                        </div>
                    </div>
                </div>
                <div className={"d-flex align-items-center mr-2"}>
                    <XCircle size={30} color={"#5f1518"} className={"removeFileFromListIcon"} />
                </div>
            </div>
        )
    }
}

export default FilePreviewComponent;
