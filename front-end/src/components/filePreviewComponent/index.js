import React, {Component} from "react";
import './style.css';
import {XCircle} from "react-feather";

class FilePreviewComponent extends Component {
    constructor(props) {
        super(props);
    }

    mimeTypeToText = (mimeType) => {
        if(["image/bmp", "image/png", "image/gif", "image/jpeg"].indexOf(mimeType) > -1)
            return "Immagine";

        if(["application/pdf"].indexOf(mimeType) > -1)
            return "PDF";

        if(["video/mpeg", "video/ogg", "video/mp2t", "video/webm", "video/3gpp", "video/3gpp2", "video/x-msvideo"].indexOf(mimeType) > -1)
            return "Video";

        if(["application//x-7z-compressed", "application/x-bzip", "application/x-bzip2", "application/gzip"].indexOf(mimeType) > -1)
            return "Archivio Compresso";

        if(["application/octet-stream"].indexOf(mimeType) > -1)
            return "Binary data";

        if(["text/js"].indexOf(mimeType) > -1)
            return "Javascript";

        if(["audio/mpeg", "audio/midi", "audio/x-midi"].indexOf(mimeType) > -1)
            return "Audio";

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
                            Tipo file
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
