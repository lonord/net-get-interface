import * as cp from 'child_process'
import * as util from 'util'

const execAsync = util.promisify(cp.exec)

export default async function getInterface(): Promise<string[]> {
	if (process.platform !== 'linux') {
		throw new Error('Only support linux platform')
	}
	const result = await execAsync(`ifconfig -s | sed '1d' | cut -d " " -f 1`)
	if (!result) {
		return []
	}
	const stdout = result.stdout
	if (!stdout) {
		return []
	}
	return stdout.split('\n').map((s) => s.trim())
}
