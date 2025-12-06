const HA_TOKEN = process.env.HOME_ASSISTANT_LONG_LIVED_TOKEN;
const HA_URL = `http://${process.env.HOME_ASSISTANT_IP}:${process.env.HOME_ASSISTANT_PORT || '8123'}`;

const headers = {
    "Authorization": `Bearer ${HA_TOKEN}`,
    "Content-Type": "application/json"
};

export async function service(domain, service, data = {}) {
  const res = await fetch(`${HA_URL}/api/services/${domain}/${service}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${HA_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) throw new Error(`HA error: ${res.status}`);
  return await res.json();
}

export async function getState(entity_id) {
  const res = await fetch(`${HA_URL}/api/states/${entity_id}`, {
    headers: {
      "Authorization": `Bearer ${HA_TOKEN}`
    }
  });
  return await res.json();
}
export async function setState(entity_id, state) {
    return await service(entity_id.split('.')[0], 'turn_'+state, {
        entity_id: entity_id,
    });
}

export async function getAllEntityIDs() {
  const res = await fetch(`${HA_URL}/api/states`, {
    headers: {
      "Authorization": `Bearer ${HA_TOKEN}`,
      "Content-Type": "application/json"
    }
  });

  if (!res.ok) {
    console.error("Failed to contact Home Assistant:", res.status, await res.text());
    process.exit(1);
  }

  const data = await res.json();
  const entityIds = data.map(item => item.entity_id);

  console.log("ENTITY IDS:");
  entityIds.forEach(id => console.log(id));

  return entityIds;
}
