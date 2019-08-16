import { RoutingManager } from '../RoutingManager';
import { Users } from '../../../../models/server/raw';

/* Load Balancing Queuing method:
	*
	* default method where the agent with the least number
	* of open chats is paired with the incoming livechat
*/
class LoadBalancing {
	constructor() {
		this.config = {
			previewRoom: false,
			showConnecting: false,
			showQueue: false,
			showQueueLink: false,
			returnQueue: false,
			enableTriggerAction: true,
			autoAssignAgent: true,
		};
	}

	async getNextAgent(department) {
		const nextAgent = await Users.getNextLeastBusyAgent(department);
		if (!nextAgent) {
			return;
		}
		const { agentId, username } = nextAgent;
		return { agentId, username };
	}

	delegateAgent(agent) {
		return agent;
	}
}

RoutingManager.registerMethod('Load_Balancing', LoadBalancing);