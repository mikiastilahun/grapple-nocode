import { writable } from 'svelte/store';

export type remoteInfo = {
	remoteEntryUrl: string;
	remoteName: string;
	components: string[];
};

const remote = writable<remoteInfo | undefined>();
export default remote;
