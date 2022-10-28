package slide_to_push_backend.service.member;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import slide_to_push_backend.entity.member.Account;
import slide_to_push_backend.repository.member.AccountRepository;
import slide_to_push_backend.repository.member.AuthenticationRepository;
import slide_to_push_backend.service.member.request.MemberSignInRequest;
import slide_to_push_backend.service.security.RedisService;

import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
public class MemberServiceImpl implements MemberService{

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private RedisService redisService;

    @Override
    public String signIn(MemberSignInRequest request) {
        String email = request.getEmail();
        Optional<Account> maybeMember = accountRepository.findByEmail(email);
/*
        public Board read(Long boardNo) {
            Optional<Board> maybeBoard = repository.findById(boardNo);

            if (maybeBoard.equals(Optional.empty())) {
                log.info("Can't read board!!!");
                return null;
            }

            return maybeBoard.get();

        }
  */
        if (maybeMember.isPresent()) {
            Account account = maybeMember.get();

            log.info("member email: " + account.getEmail());
            log.info("request email: " + request.getEmail());
            log.info("request password: " + request.getPassword());

            if (!account.isRightPassword(request.getPassword())) {
                throw new RuntimeException("패스워드가 잘못됨!");
            }

            UUID userToken = UUID.randomUUID();

            redisService.deleteByKey(userToken.toString());
            redisService.setKeyAndValue(userToken.toString(), account.getId());

            return userToken.toString();
        }

        throw new RuntimeException("가입된 사용자가 아님!");
    }
}