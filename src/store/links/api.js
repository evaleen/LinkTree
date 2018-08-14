export async function getLinks() {
  // Would do API call
  return await [];
}

export async function addLink(links) {
  // Would be done on b-end
  let id =
    links.length === 0
      ? 0
      : links.reduce(({ id }, highest) => {
          return highest < id ? id : highest;
        }).id + 1;
  const position =
    links.length === 0 ? 0 : links[links.length - 1].position + 1;
  const newLink = {
    id,
    deleted: 0,
    active: 1,
    highlight: "wobble",
    unsafe: 1,
    url: "",
    title: "",
    position,
    account: {},
    schedule_start: "",
    schedule_start_timezone: "",
    schedule_end: "",
    schedule_end_timezone: "",
    clicks: [],
    click_count: 0,
    created_at: new Date().toString()
  };
  return await [...links, newLink];
}

export async function updateLink(links, id, updates) {
  const index = links.findIndex(link => {
    return link.id === id;
  });
  if (index >= 0) {
    return await [
      ...links.slice(0, index),
      { ...links[index], ...updates },
      ...links.slice(index + 1)
    ];
  } else {
    return await links;
  }
}

export async function removeLink(links, id) {
  // Would be done on b-end
  const index = links.findIndex(link => {
    return link.id === id;
  });
  if (index >= 0) {
    return [...links.slice(0, index), ...links.slice(index + 1)];
  } else {
    return await links;
  }
}

export async function repositionLink(links, prevIndex, newIndex) {
  // Would be done on b-end
  const clonedLinks = Array.from(links);
  const [removed] = clonedLinks.splice(prevIndex, 1);
  clonedLinks.splice(newIndex, 0, removed);
  return await clonedLinks.map((link, index) => {
    return { ...link, position: index };
  });
}
