## Domain Event
Một chút về Domain Event.

### Domain Event là gì.
> **Event** là một cái gì đó đã xảy ra trong quá khứ. 
> **Domain Event** là một cái gì đó đã xảy ra trong **Domain** mà bạn muốn các phần khác của cùng một domain (đang trong quá trình xử lý) biết.
> Các thành phần nhận được **Event** sẽ phản ứng bằng cách nào đó với các **Event** tương ứng.

### Tại sao cần Domain Event.   
> Một lợi ích quan trọng của **Domain Event** là thể hiện các side effects một cách rõ ràng.

**Domain Event** giúp bạn diễn đạt rõ ràng các **Domain Rules**, dựa trên **Ubiquitous Language** do các **Domain Expert** cung cấp.
**Domain Event** cũng cho phép phân tách **A Better Separation of Concerns** giữa các class trong cùng một Domain.
### Ví dụ:
 - Đơn hàng đã được đặt.
 - User đã đăng kí tài khoản.

> 1 Domain Event sẽ luôn luôn có 1 Domain Event Handler.
> 

### Một số sai lầm khi tìm hiểu Domain Event.
- Lầm tưởng mọi thứ là Domain Event.

- Không thoát khởi tư duy CRUD. Dẫn đến không thể hiện hết ý nghĩa của Domain Event.


### Domain Event Rule.
> Điều quan trọng là phải đảm bảo rằng, giống như một Database Transaction, tất cả các hoạt động liên quan đến Domain Event đều kết thúc thành công hoặc không có hoạt động nào trong số chúng thực hiện.

## Nest Domain Event
Thư viện xử lý sự kiện miền DDD.

### Cài đặt package
```bash
$ npm install --save @beincom/nest-domain-event @beincom/domain @beincom/common 
# OR
$ yarn add @beincom/nest-domain-event @beincom/domain @beincom/common 
```

### Tích hợp
- Như chúng ta đã biết Domain Event sẽ được quản lý bởi Aggregates, tham khảo [@beincom/domain](https://github.com/Beincomm/typeddd/tree/master/packages/domain).

```ts
export class User extends AggregateRoot<UUID,UserProps> {
    protected _id: UUID;

    public constructor(entityProps: EntityProps<UUID, UserProps>, domainEvent: IDomainEvent<unknown>[]) {
        super(entityProps, domainEvent);
        this._id = entityProps.id;
    }

    public validate(): void {
    }

}
```
#### Raise Event.
```ts
const user = new User({...});

user.raiseEvent(/** DomainEvent **/)
```

#### Publish Event.
```ts
DomainEvents.publishEvents(user.id,logger);
```

### Domain Event Handler.
```ts
export class UserDomainEvent extends DomainEvent<string> {
    protected _aggregateId: unknown;
    protected _eventId: string;
    protected _payload: string;
}

@EventsHandler(UserDomainEvent)
export class UserDomainEventHandler extends DomainEventHandler{
    handle(event: UserDomainEvent):  void {
        // logic here
    }
}
```