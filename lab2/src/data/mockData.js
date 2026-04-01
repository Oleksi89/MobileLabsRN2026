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

export const CONTACTS_DATA = [
    {
        title: "Викладачі",
        data: [
            { id: "1", name: "Олександр Іванович", role: "Лектор" },
            { id: "2", name: "Марія Петрівна", role: "Асистент" },
        ],
    },
    {
        title: "Студенти",
        data: [
            { id: "3", name: "Артем Котенко", role: "Студент (ІПЗ-22-3)" },
            { id: "4", name: "Олена Коваленко", role: "Староста (ІПЗ-22-3)" },
            { id: "5", name: "Іван Франко", role: "Студент (ІПЗ-22-3)" },
        ],
    },
];
