import React, {Component} from 'react';
import {Basic} from 'subschema-test-samples';
import PropTypes from 'subschema-prop-types';
import DownloadButton from './DownloadButton.jsx';
import {capitalize, camelCase} from 'subschema-utils';
export default class ExportButtons extends Component {
    static propTypes = {
        filename          :PropTypes.value,
        description       :PropTypes.value,
        jsName            :PropTypes.value,
        schema            :PropTypes.value,
        title             :PropTypes.value,
        projectVersion    :PropTypes.value,
        projectName       :PropTypes.value,
        projectDescription:PropTypes.value,
        sample            :PropTypes.value,
        editorCode        :PropTypes.string

    };

    static defaultProps = {
        filename          :'name',
        description       :'description',
        title             :'title',
        jsName            :'jsName',
        schema            :'schema',
        projectVersion    :'package.version',
        projectName       :'project.name',
        projectDescription:'project.description',
        sample            :'sample'
    };

    render() {
        let {
                filename,
                description,
                title,
                schema,
                jsName,
                projectVersion,
                projectDescription,
                projectName,
                sample,
                editorCode,
            }       = this.props;
        filename    = filename || 'simple';
        description = description || filename;

        const data = {
            jsName :jsName || camelCase(filename),
            name   :filename,
            title  :title || capitalize(filename.replace('-', ' ')),
            schema :schema && schema.schema || sample.schema,
            project:{
                version    :projectVersion || '1.0.0',
                name       :projectName || filename,
                description:projectDescription || description
            },
            sample
        };

        return (<div className="btn-group">
            <DownloadButton filename={filename} editorCode={editorCode} data={data} type='project' key="project"/>
            <DownloadButton filename={filename} editorCode={editorCode} data={data} type='page' key="page"
                            buttonTxtPage="Preview"/>
        </div>);
    }
}
