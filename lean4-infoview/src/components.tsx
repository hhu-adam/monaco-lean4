import * as React from 'react';

import { InteractiveDiagnostics_msgToInteractive, MessageData } from '@leanprover/infoview-api';
import { InteractiveMessage } from './infoview/traceExplorer';
import { useAsync, mapRpcError } from './infoview/util';
import { RpcContext } from './infoview/rpcSessions';

export * from '@leanprover/infoview-api';
export * from './infoview/util';
export { EditorContext, VersionContext } from './infoview/contexts';
export { EditorConnection } from './infoview/editorConnection';
export { RpcContext } from './infoview/rpcSessions';
export { ServerVersion } from './infoview/serverVersion';

export { InteractiveCode, InteractiveCodeProps } from './infoview/interactiveCode';


/** Display the given message data as interactive, pretty-printed text. */
export function InteractiveMessageData({ msg }: { msg: MessageData }) {
    const rs = React.useContext(RpcContext)

    const [status, tt, error] = useAsync(
        () => InteractiveDiagnostics_msgToInteractive(rs, msg, 0),
        [rs, msg]
    )

    if (tt) {
        return <InteractiveMessage fmt={tt} />
    } else if (status === 'pending') {
        return <>...</>
    } else {
        return <div>Failed to display message:
            {error && <span>{mapRpcError(error).message}</span>}
        </div>
    }
}