export const generateNews = (startIndex = 0, count = 15) => {
    return Array.from({ length: count }).map((_, i) => {
        const id = startIndex + i;
        return {
            id: id.toString(),
            title: `Новина #${id + 1}`,
            description: `Це детальний опис новини #${id + 1}. Тут міститься розширена інформація про подію, яка сталась нещодавно.`,
            image: `https://picsum.photos/seed/${id}/200/200`,
        };
    });
};
